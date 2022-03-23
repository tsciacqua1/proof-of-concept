const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const routes = require("./src/routes");

const port = process.env.PORT || 3001;

var app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
