import {RedisClientType} from "@redis/client";
import {createClient} from "redis";

export let redisClient: RedisClientType<any, any>;

export const connectRedis = async () => {
    redisClient = createClient({
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
