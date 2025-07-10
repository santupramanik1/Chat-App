import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let channel: amqp.Channel;
export const consumeOtpFromQueue = async () => {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_HOST,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password,
        });

        // Create Channel for OTP comnsuming
        channel = await connection.createChannel();

        // Define queue from where we can recieve the OTP
        const queueName = "send-otp";
        await channel.assertQueue(queueName, {durable: true});

        console.log("✅ Mail service consumer started listening for Otp Email");

        // Start consuming Otp from the queue
        channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const {to, subject, body} = JSON.parse(msg.content.toString());

                    // Create a transporter
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASSWORD,
                        },
                    });

                    // Send the OTP to the Email
                    await transporter.sendMail({
                        from: "Chat-App",
                        to,
                        subject,
                        text: body,
                    });

                    console.log(`OTP mail sent to ${to}`);
                    channel.ack(msg);
                } catch (error) {
                    console.log("Failed to Send OTP", error);
                }
            }
        });
    } catch (error) {
        console.log("Failed to Consume OTP From  Rabbitmq", error);
    }
};
