const amqp = require("amqplib");
const sortStrings = require("../utils/compareTwoStringsAplhabetically");

async function publishMessage(sender_email, receiver_email, message_sent) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueName = sortStrings(sender_email, receiver_email);
    await channel.assertQueue(queueName, { durable: true });

    const message = { sender: sender_email, message: message_sent };
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    console.log("[x] Sent %s", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

module.exports = publishMessage;
