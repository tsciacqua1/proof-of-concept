const sharp = require("sharp");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const multer = require("multer");
const upload = require("./multer");
require("dotenv").config();

const s3 = new AWS.S3();
const { AWS_BUCKET_NAME } = process.env;

const home = (req, res) => {
  try {
    res.send("Home");
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({ error: err.message, message: "Max size 5MB" });
      } else if (err) {
        res.status(400).send({ error: true, message: err.error.message });
      } else if (!req.file) {
        res
          .status(400)
          .send({ error: true, message: "Select a file to upload" });
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
                if (err) console.log(err);
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
    });
  } catch (error) {
    res.send({ error: true, message: err.message });
  }
};

module.exports = {
  home,
  uploadImage,
};
