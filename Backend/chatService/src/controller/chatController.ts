import axios from "axios";
import {TryCatch} from "../config/TryCatch.js";
import {AuthenticatedRequest} from "../middlewares/isAuthenticated.js";
import {Chat} from "../model/chatModel.js";
import {Messages} from "../model/messageModel.js";
import {getRecieverSocketId, io} from "../config/socket.js";

// CREATE A NEW CHAT
export const createNewChat = TryCatch(async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;

    const {otherUserId} = req.body;

    if (!otherUserId) {
        return res.status(400).json({
            message: "Other userId is required",
        });
    }

    // Find the Existing chat
    const existingChat = await Chat.findOne({users: {$all: [userId, otherUserId], $size: 2}});

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
    const chats = await Chat.find({users: userId}).sort({updatedAt: -1});

    const chatsWithUserData = await Promise.all(
        chats.map(async (chat) => {
            const otherUserId = chat.users.find((id) => id !== userId);

            // Count the unseen messages
            const unseenCount = await Messages.countDocuments({
                chatId: chat._id, //To focus only on the specific chat
                sender: {$ne: userId}, //So we don't count messages from yourself
                seen: false, //To get only messages you haven't read
            });

            try {
                const {data} = await axios.get(`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`);
                return {
                    user: data,
                    chat: {
                        ...chat.toObject(),
                        latestMessage: chat.latestMessage || null,
                        unseenCount,
                    },
                };
            } catch (error) {
                console.log(error);
                return {
                    user: {_id: otherUserId, name: "Unknown user"},
                    chat: {
                        ...chat.toObject(),
                        latestMessage: chat.latestMessage || null,
                        unseenCount,
                    },
                };
            }
        })
    );

    res.json({
        chats: chatsWithUserData,
    });
});

// SEND MESSAGE
export const sendMessages = TryCatch(async (req: AuthenticatedRequest, res) => {
    const senderId = req.user?._id;
    const {chatId, text} = req.body;
    const imageFile = req.file;

    // If the senderId not found
    if (!senderId) {
        return res.status(401).json({
            message: "Unauthorized user",
        });
    }

    // If the chatId not Found
    if (!chatId) {
        return res.status(401).json({
            message: "chatId required",
        });
    }

    // If the text or image is missing
    if (!text && !imageFile) {
        return res.status(400).json({
            message: "Text or images required",
        });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found",
        });
    }

    // Check if the user is in that chat
    const isUserInChat = chat.users.some((userId) => userId.toString() === senderId.toString());
    if (!isUserInChat) {
        return res.status(403).json({
            message: "You are not not a participants in this chat",
        });
    }

    // Find the other userId
    const otherUserId = chat.users.find((userId) => userId.toString() !== senderId.toString());
    if (!otherUserId) {
        return res.status(401).json({
            message: "No other user found",
        });
    }

    // Socket setup
    const recieverSocketId = getRecieverSocketId(otherUserId.toString());
    let isRecieverInChatRoom = false;

    if (recieverSocketId) {
        const recieverSocket = io.sockets.sockets.get(recieverSocketId);
        if (recieverSocket && recieverSocket.rooms.has(chatId)) {
            isRecieverInChatRoom = true;
        }
    }

    let messageData: any = {
        chatId: chatId,
        sender: senderId,
        seen: isRecieverInChatRoom,
        seenAt: isRecieverInChatRoom ? new Date() : undefined,
    };

    //
    if (imageFile) {
        messageData.image = {
            url: imageFile.path,
            publicId: imageFile.filename,
        };
        messageData.messageType = "image";
        messageData.text = text || "";
    } else {
        messageData.text = text;
        messageData.messageType = "text";
    }

    const message = new Messages(messageData);
    const savedMessages = await message.save();

    // Update the latest message
    const latestMessageText = imageFile ? "📸 image" : text;

    await Chat.findByIdAndUpdate(
        chatId,
        {
            latestMessage: {
                text: latestMessageText,
                sender: senderId,
            },
            updatedAt: new Date(),
        },
        {new: true}
    );

    // emit to socket
    io.to(chatId).emit("newMessage", savedMessages);
    if (recieverSocketId) {
        io.to(recieverSocketId).emit("newMessage", savedMessages);
    }

    const senderSocketId = getRecieverSocketId(senderId.toString());
    if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", savedMessages);
    }

    if (isRecieverInChatRoom && senderSocketId) {
        io.to(senderSocketId).emit("messagesSeen", {
            chatId: chatId,
            seenBy: otherUserId,
            messagesIds: [savedMessages._id],
        });
    }

    return res.status(201).json({
        message: savedMessages,
        sender:senderId,
    });
});

// GET MESSAGES OF ALL CHAT
export const getMessagesByChat = TryCatch(async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;
    const chatId = req.params.chatId;

    // If the userId not found
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized user",
        });
    }

    // If the chatId not Found
    if (!chatId) {
        return res.status(401).json({
            message: "chatId required",
        });
    }

    // Find the chat
    const chat = await Chat.findById(chatId);
    // If the chatId not Found
    if (!chat) {
        return res.status(404).json({
            message: "Chat Not Found",
        });
    }

    // Check if the particular user is belogs to the particular chat
    const isUserInChat = chat.users.some((id) => id.toString() === userId.toString());
    if (!isUserInChat) {
        return res.status(403).json({
            message: "You are not not a participants in this chat",
        });
    }

    // Mark the Message as seen
    const messagesMarkToSeen = await Messages.find({
        chatId: chatId,
        sender: {$ne: userId},
        seen: false,
    });

    await Messages.updateMany(
        {
            chatId: chatId,
            sender: {$ne: userId},
            seen: false,
        },
        {
            seen: true,
            seenAt: new Date(),
        }
    );

    // Get the Messages
    const messages = await Messages.find({chatId}).sort({createdAt: 1});

    // Find the otherIUserId
    const otherUserId = chat.users.find((id) => id !== userId);

    try {
        const {data} = await axios.get(`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`);

        if (!otherUserId) {
            console.log("Your assumption is true :" + userId + otherUserId);
            return res.status(404).json({
                message: "No other User",
            });
        }
        // socket work

        if (messagesMarkToSeen.length > 0) {
            const otherUserSocketId = getRecieverSocketId(otherUserId.toString());
            if(otherUserSocketId)
            {
                io.to(otherUserSocketId).emit("messagesSeen",{
                    chatId:chatId,
                    seenBy:userId,
                    messagesIds:messagesMarkToSeen.map((msg)=>msg._id)
                })
            }
        }

        return res.json({
            messages,
            user: data,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            messages,
            user: {_id: otherUserId, name: "Unknown User Found"},
        });
    }
});
