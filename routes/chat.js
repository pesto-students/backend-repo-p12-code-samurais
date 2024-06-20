var express = require("express");
var router = express.Router();
const publisher = require("../chatServer/publisher");
const subscriber = require("../chatServer/subscriber");
const authMiddleware = require("../utils/authMiddleware");

// Route to get the messages from a queue
router.get("/", async (req, res) => {
  subscriber("ayush@gmail.com", "dency@gmail.com");
  res.send("Messages Recieved");
});

// Route
router.post("/send_message", async (req, res) => {
  const { sender_email, receiver_email, message } = req.body;
  await publisher(sender_email, receiver_email, message);
  res.send("Message Sent");
});

module.exports = authMiddleware(router);
