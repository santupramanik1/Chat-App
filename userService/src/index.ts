import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import {connectRedis} from "./config/redis.js";
import userRoutes from "./routes/user.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
const app = express();

dotenv.config();

// CONNECT TO THE MONGODB
connectDB();

// CONNECT TO THE REDIS
connectRedis();

// CONNECT TO RABBITMQ
connectRabbitMQ()

// ROUTES
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is Listening at PORT", PORT);
});
