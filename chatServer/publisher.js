const amqp = require("amqplib");

async function publishMessage() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel
    const channel = await connection.createChannel();

    // Declare a queue
    const queueName = "hello";
    await channel.assertQueue(queueName, { durable: false });

    // Message to be sent
    const message = { user: "Ayush", message: "Hello RabbitMQ!" };

    // Publish the message to the queue
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    console.log("[x] Sent %s", message);

    // Close the connection and channel
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
}

module.exports = publishMessage;

// publishMessage();
