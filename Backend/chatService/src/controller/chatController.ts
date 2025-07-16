import { TryCatch } from "../config/TryCatch.js";
import { AuthenticatedRequest } from "../middlewares/isAuthenticated.js";
import { Chat } from "../model/chatModel.js";

export const createNewChat = TryCatch(async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;

    const { otherUserId } = req.body;

    if (!otherUserId) {
        return res.status(400).json({
            message: "Other userId is required",
        });
    }

    // Find the Existing chat
    const existingChat = await Chat.findOne({ users: { $all: [userId, otherUserId], $size: 2 } });

    if (existingChat) {
        return res.json({
            message: "Chat already Exists",
            chatId: existingChat._id,
        });
    }

    // CREATE A NEW CHAT
    const newChat = await Chat.create({
        users: [userId, otherUserId],
    });

    res.status(201).json({
        message: "New Chat Created",
        chatId: newChat._id,
    });
});

//FETCH ALL THE CHAT
export const getAllChat = TryCatch(async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(400).json({
            message: "UserId is Missing",
        });
    }

    // Fetch all chats for the current user and sort them by most recently updated (latest activity first)
    const chats = Chat.find({ user: userId }).sort({ updatedAt: -1 });

    
});
