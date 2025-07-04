import { createClient } from "redis";
export const connectRedis = async () => {
    const redisClient = createClient({
        url: process.env.REDIS_URL,
    });
    try {
        await redisClient.connect();
        console.log("Redis connected successfully");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        process.exit(1);
    }
};
