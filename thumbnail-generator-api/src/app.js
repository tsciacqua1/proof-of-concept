const serverless = require("serverless-http");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config;
require("../config/passport")(passport);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use("/", routes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports.app = serverless(app);
