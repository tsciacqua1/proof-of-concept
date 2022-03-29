const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validatePassword = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    return error;
  }
};

const generatePassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    return error;
  }
};

const issueJWT = (user) => {
  const { email } = user;

  const expiresIn = "1d";

  const payload = {
    sub: email,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports = {
  validatePassword,
  generatePassword,
  issueJWT,
};
