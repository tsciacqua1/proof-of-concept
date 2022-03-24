const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      cb(null, true);
    } else cb({ error: new Error("Only JPG and PNG") });
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("image");

module.exports = upload;
