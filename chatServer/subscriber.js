const amqp = require("amqplib");
const sortStrings = require("../utils/compareTwoStringsAplhabetically");

async function receiveMessage(sender_email, receiver_email) {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel
    const channel = await connection.createChannel();

    // Declare a queue
    const queueName = sortStrings(sender_email, receiver_email);
    await channel.assertQueue(queueName, { durable: true });

    console.log(
      " [*] Waiting for messages in %s. To exit, press CTRL+C",
      queueName
    );

    // Consume messages from the queue
    channel.consume(
      queueName,
      function (msg) {
        const message = msg.content.toString();
        console.log(" [x] Received %s", message);
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
}

module.exports = receiveMessage;
