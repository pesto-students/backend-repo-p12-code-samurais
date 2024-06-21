const express = require("express");
const router = express.Router();
const publisher = require("../chatServer/publisher");
const subscriber = require("../chatServer/subscriber");

// In-memory storage for messages (for demo purposes, should use database in production)
let messages = [];

// Route to get all messages
router.get("/", (req, res) => {
  res.json(messages);
});

// Route to send a message
router.post("/send_message", async (req, res) => {
  const { sender_email, receiver_email, message } = req.body;
  await publisher(sender_email, receiver_email, message); // Publish message to RabbitMQ
  messages.push({ sender: sender_email, message: message }); // Update messages array (demo only)
  res.send("Message Sent");
});

// Initialize subscriber for receiving messages (optional, depends on your architecture)
subscriber("ayush@gmail.com", "dency@gmail.com");

module.exports = router;
