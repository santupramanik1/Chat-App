import amqp from "amqplib";

let channel: amqp.Channel;

// CREATE CONNECTION TO THE RABBITMQ
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_HOST,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password,
        });

        // CREATE CHANNEL FOR MESSAGE DELIVERYING
        channel = await connection.createChannel();

        console.log("✅ Connected to rabbitmq");
    } catch (error) {
        console.log("Failed to connnect to rabbitmq", error);
    }
};

// SEND THE MESSAGE TO THE QUEUE
export const publishOtpToQueue = async (queueName: string, message: any) => {
    // If the Channel is not defined
    if (!channel) {
        console.log("Rabbitmq channel is not defined !");
        return;
    }

    // Define the queue
    channel.assertQueue(queueName, {durable: true});

    // Send the OTP to the queue
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
};
