import mongoose from "mongoose";
export const connectDB = async () => {
    const connectionURL = process.env.MONGO_URI;
    if (!connectionURL) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }
    try {
        await mongoose.connect(connectionURL, {
            dbName: "chatApp"
        });
        console.log("Connected to mongoDB");
    }
    catch (error) {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};
