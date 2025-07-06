import express from "express";
import dotenv from "dotenv";
import { consumeOtpFromQueue } from "./otpConsumer.js";

dotenv.config()
const app = express();

consumeOtpFromQueue()
const PORT = process.env.PORT||5001;
app.listen(PORT, () => {
    console.log("Server is Running at PORT", PORT);
});
