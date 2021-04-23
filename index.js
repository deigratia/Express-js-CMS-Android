const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// const multer = require("multer");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5123;

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

const db = require("./src/config/db.config.js");

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", require("./src/routes/status_api"));
app.use("/api", require("./src/routes/login"));
app.use("/api", require("./src/routes/list"));


app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
