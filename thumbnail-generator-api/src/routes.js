const { Router } = require("express");
const { home, uploadImage } = require("./controllers");

const router = Router();

router.get("/", home);
router.post("/upload", uploadImage);

module.exports = router;
