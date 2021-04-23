const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  const localTime = new Date().toLocaleTimeString();
  const localDate = new Date().toLocaleDateString();
  res.send(`server date ${localDate} ${localTime}`);
});

module.exports = router;
