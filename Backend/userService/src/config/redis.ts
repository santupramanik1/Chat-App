import {createClient} from "redis";

export const redisClient = createClient({
    url: process.env.REDIS_URL,
});
export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis connected successfully");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        process.exit(1);
    }
};
