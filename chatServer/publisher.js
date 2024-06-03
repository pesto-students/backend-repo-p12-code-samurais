const amqp = require("amqplib");
const subscriber = require("./subscriber");
const sortStrings = require("../utils/compareTwoStringsAplhabetically");

async function publishMessage(sender_email, receiver_email, message_sent) {
  subscriber(sender_email, receiver_email);
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel
    const channel = await connection.createChannel();

    // Declare a queue
    const queueName = sortStrings(sender_email, receiver_email);
    await channel.assertQueue(queueName, { durable: true });

    // Message to be sent
    const message = { sender: sender_email, message: message_sent };

    // Publish the message to the queue
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    console.log("[x] Sent %s", message);

    // Close the connection and channel
    setTimeout(function () {
      connection.close();
      //   process.exit(0);
    }, 500);
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
}

module.exports = publishMessage;
