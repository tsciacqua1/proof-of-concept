const { Router } = require("express");
const { postImage } = require("./controllers");

const router = Router();

router.post("/upload", postImage);

module.exports = router;
