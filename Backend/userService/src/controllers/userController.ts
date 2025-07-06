import {publishOtpToQueue} from "../config/rabbitmq.js";
import {TryCatch} from "../config/TryCatch.js";
import {handleOtpRequest} from "./otpController.js";

// USER SIGNUP
export const signupUser = TryCatch(async (req, res) => {});

// URSER LOGIN
export const loginUser = TryCatch(async (req, res) => {
    // Get the user email and password
    const {email} = req.body;

    const {status, otp, message} = await handleOtpRequest(email);

    if (status === 429) {
        res.status(429).json({
            success: false,
            message,
        });
        return;
    }

    const emailPayload = {
        to: email,
        subject: "Your Otp Code",
        body: `Your OTP is ${otp} it is valid for 5 minutes`,
    };

    await publishOtpToQueue("send-otp", emailPayload);
    res.status(200).json({success: true, message});
});
