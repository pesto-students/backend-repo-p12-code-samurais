var express = require("express");
var router = express.Router();
const publisher = require("../chatServer/publisher");

router.get("/", async (req, res) => {
  await publisher();
  res.send("Message Sent");
});

module.exports = router;
