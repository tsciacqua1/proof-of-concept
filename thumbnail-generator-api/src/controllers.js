const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const { map } = require("lodash");
const uploadImage = require("./multer");
const { uploadsDir } = require("./constants");

const home = (req, res) => {
  res.send(`<form action="/api/v1/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" accept="image/*" />
  <input type="submit" value="upload" />
</form>`);
};

const postImage = (req, res) => {
  try {
    uploadImage(req, res, async (err) => {
      if (!req.file) {
        res
          .status(400)
          .send({ error: true, message: "Select a file to upload" });
      } else {
        const folderName = req.file.filename.split(".")[0];
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

        await fs.mkdir(`${uploadsDir}/${folderName}`, (err) => {
          if (err) return console.error(err);
        });

        map(sizes, (size) => {
          sharp(req.file.path)
            .resize(size.w, size.h)
            .toFile(
              `${uploadsDir}/${folderName}/thumbnail(${size.name})-${req.file.filename}`,
              (err) => {
                if (err) return res.send({ error: true, message: err.message });
              }
            );
        });

        const file = `${uploadsDir}/${folderName}.zip`;

        if (err) res.status(400).send({ error: true, message: err.message });
        //else res.json(req.file);
        else res.redirect(`/api/v1/download/${folderName}`);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const downloadImages = async (req, res) => {
  const { id } = req.params;
  var zip = new JSZip();
  try {
    (async () => {
      var files = await fs.promises.readdir(path.join(uploadsDir, id));
      for (const file of files) {
        zip.file(file);
      }
    })();
    zip
      .generateNodeStream({ type: "nodebuffer", streamFiles: true })
      .pipe(fs.createWriteStream(`${uploadsDir}/${id}.zip`));
  } catch (err) {
    res.send({ error: true, message: err.message });
  }
};

module.exports = {
  home,
  postImage,
  downloadImages,
};
