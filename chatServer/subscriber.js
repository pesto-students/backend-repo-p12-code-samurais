const amqp = require("amqplib");
const sortStrings = require("../utils/compareTwoStringsAplhabetically");

async function receiveMessage(sender_email, receiver_email) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueName = sortStrings(sender_email, receiver_email);
    await channel.assertQueue(queueName, { durable: true });

    console.log(
      " [*] Waiting for messages in %s. To exit, press CTRL+C",
      queueName
    );

    channel.consume(queueName, function (msg) {
      const message = msg.content.toString();
      console.log(" [x] Received %s", message);
      // Acknowledge the message
      channel.ack(msg);
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

module.exports = receiveMessage;
