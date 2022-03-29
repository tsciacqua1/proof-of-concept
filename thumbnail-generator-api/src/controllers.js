const sharp = require("sharp");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const multer = require("multer");
const upload = require("../config/multer");
const utils = require("../lib/utils");
require("dotenv").config();

AWS.config.update({ region: "sa-east-1" });

const db = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const { AWS_BUCKET_NAME } = process.env;

const uploadImage = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      try {
        if (err instanceof multer.MulterError) {
          next(err);
        } else if (err) {
          next(err.error);
        } else if (!req.file) {
          throw new Error("Select a file to upload");
        } else {
          const id = uuidv4();
          const sizes = [
            {
              name: "large",
              w: 400,
              h: 300,
            },
            {
              name: "medium",
              w: 160,
              h: 120,
            },
            {
              name: "small",
              w: 120,
              h: 120,
            },
          ];

          const files = await Promise.all(
            _.map(sizes, (size) => {
              return sharp(req.file.buffer)
                .resize(size.w, size.h)
                .png()
                .toBuffer();
            })
          );

          const urls = await Promise.all(
            _.map(files, async (el, i) => {
              let params = {
                Bucket: `${AWS_BUCKET_NAME}/uploads`,
                ACL: "public-read",
                Key: `${id}-${sizes[i].name}.png`,
                Body: el,
              };
              return await s3
                .upload(params, (err) => {
                  next(err);
                })
                .promise();
            })
          );

          res.send({
            images: {
              small: urls[2].Location,
              medium: urls[1].Location,
              large: urls[0].Location,
            },
          });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const params = {
        TableName: "Users",
        Key: {
          email,
        },
      };

      const response = await db
        .get(params, (err) => {
          if (err) next(err);
        })
        .promise();

      if (response.Item) {
        const isValid = utils.validatePassword(
          password,
          response.Item.password
        );

        if (isValid) {
          const tokenObject = utils.issueJWT(response.Item);
          res.json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
            user: {
              email: response.Item.email,
              firstname: response.Item.firstname,
              lastname: response.Item.lastname,
            },
          });
        }
      } else throw new Error("Incorrect email or password");
    } else throw new Error("Email or password missing");
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (email && password) {
      const getParams = {
        TableName: "Users",
        Key: {
          email,
        },
      };

      const response = await db
        .get(getParams, (err) => {
          if (err) next(err);
        })
        .promise();

      if (response.Item) throw new Error("Email already exists");

      const hash = await utils.generatePassword(password);

      const params = {
        TableName: "Users",
        Item: {
          firstname,
          lastname,
          email,
          password: hash,
        },
      };

      await db
        .put(params, (err) => {
          if (err) next(err);
        })
        .promise();

      res.status(200).json("User created successfully");
    } else throw new Error("Email or password missing");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  login,
  register,
};
