const serverless = require("serverless-http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/v1", routes);

app.listen(3001, () => {
  console.log(`Server listening on port ${3001}`);
});

module.exports.handler = serverless(app);
