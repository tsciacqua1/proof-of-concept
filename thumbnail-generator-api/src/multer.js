const multer = require("multer");
const path = require("path");
const { uploadsDir } = require("./constants");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      cb(null, true);
    } else cb(new Error("Only JPG and PNG"));
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const uploadSingleImage = upload.single("image");

module.exports = uploadSingleImage;
