import { generateToken } from "../config/generateToken.js";
import { publishOtpToQueue } from "../config/rabbitmq.js";
import { redisClient } from "../config/redis.js";
import { TryCatch } from "../config/TryCatch.js";
import { AuthenticatedRequest } from "../middleware/isAuth.js";
import { User } from "../model/userModel.js";
import { handleOtpRequest } from "./otpController.js";

// USER SIGNUP
export const signupUser = TryCatch(async (req, res) => { });

// URSER LOGIN
export const loginUser = TryCatch(async (req, res) => {
    // Get the user email and password
    const { email } = req.body;

    const { status, otp, message } = await handleOtpRequest(email);

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
    res.status(200).json({ success: true, message });
});

// VERIFY OTP
export const verifyUser = TryCatch(async (req, res) => {
    // Get the email and otp from the user
    const { email, otp: enteredOtp } = req.body;

    if (!email || !enteredOtp) {
        res.status(400).json({ success: false, message: "Email or Otp is required" });
        return;
    }

    // Get the OTP from the redis
    const otpKey = `otp:${email}`;
    const storedOtp = await redisClient.get(otpKey);
    if (!storedOtp || storedOtp !== enteredOtp) {
        res.status(400).json({ success: false, message: "Invalid or Expired otp" });
        return;
    }

    // After Successfull otp entered we delete the otp from the redis
    await redisClient.del(otpKey);

    let user = await User.findOne({ email });

    // If the user is not find create a new account
    if (!user) {
        const name = email.slice(0, 8);
        user = await User.create({ name, email });
    }

    const token = generateToken(user);

    res.json({
        success: true,
        message: "User verified",
        user,
        token,
    });
});

// GET THE USER PROFILE
export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
    const user = req.user;

    res.json({
        user,
    });
});

// UPDATE USER-NAME
export const updateUserName = TryCatch(async (req: AuthenticatedRequest, res) => {

    // Find the user from the DB based on his userId
    const user = await User.findById(req.user?._id)

    // If the user not find simply return 404
    if (!user) {
        res.status(404).json({
            success: false,
            message: "Please Login"
        })
        return
    }

    //Take the new username as an input from the user
    user.name = req.body.name;

    // Save the new username into the DB
    await user.save()

    // Update the username into the jwt token and generate a new token
    const token = generateToken(user)

    res.json({
        message: "User profile updated successfully",
        user,
        token
    })

});

// GET ALL THE USER
export const getAllUser = TryCatch(async (req: AuthenticatedRequest, res) => {
    const users = await User.find()

    res.json(users)
})

// GET A PARTICULAR USER BY ID
export const getUser = TryCatch(async (req: AuthenticatedRequest, res) => {
    const user = await User.findById(req.params.id)

    res.json(user)
})