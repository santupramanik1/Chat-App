import {redisClient} from "../config/redis.js";

// HANLDE OTP RATE LIMIT
export const handleOtpRequest = async (email: string) => {
    const MAX_TOKEN = 5;
    const REFILL_INTERVAL = 12;
    const EXPIRE_TIME = 60;

    // Get the Current time in Second
    const currentTime = Math.floor(Date.now() / 1000);

    const countKey = `rate_limit:otp:${email}:count`; //Store the how many time otp is geneate among the 5 trials
    const refillKey = `rate_limit:otp:${email}:lastRefill`; //store the last otp generation time

    // Get the current token count and last refill time
    let [countStr, refillStr] = await redisClient.mGet([countKey, refillKey]);

    // Convert String to Integer
    let count = parseInt(countStr || "5");
    let lastRefill = parseInt(refillStr || currentTime.toString());

    // Calculate how much has passed
    const timePassed = currentTime - lastRefill;

    // Calculate how much tokens to refill
    const tokenToAdd = Math.floor(timePassed / REFILL_INTERVAL);

    if (tokenToAdd > 0) {
        count = Math.min(MAX_TOKEN, count + tokenToAdd);
        lastRefill = currentTime; // Update last refill only if tokens were added
    }

    if (count <= 0) {
        return {
            status: 429,
            message: "Too many OTP requests. Please wait and try again.",
        };
    }

    // Use 1 token
    count--;

    // Store updated values in Redis with expiry
    const pipeLine = redisClient.multi();
    pipeLine.set(countKey, count, {EX: EXPIRE_TIME});
    pipeLine.set(refillKey, lastRefill, {EX: EXPIRE_TIME});
    pipeLine.exec();

    // Generate and store otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.set(`otp:${email}`, otp, {EX: 300});

    return {
        status: 200,
        otp,
        message: "Otp sent succesfully",
    };
};
