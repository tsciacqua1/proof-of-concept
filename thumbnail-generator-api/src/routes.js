const router = require("express").Router();
const passport = require("passport");
const { uploadImage, login, register } = require("./controllers");

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  uploadImage
);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
