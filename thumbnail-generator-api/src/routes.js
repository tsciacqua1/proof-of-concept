const { Router } = require("express");
const { home, postImage, downloadImages } = require("./controllers");

const router = Router();

router.get("/", home);
router.post("/upload", postImage);
router.get("/download/:id", downloadImages);

module.exports = router;
