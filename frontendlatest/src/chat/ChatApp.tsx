import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {chat_service, useAppData, user_service, type User} from "../context/AppContext";
import {Loading} from "../components/Loading";
import {Sidebar} from "../components/Sidebar";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import {ChatHeader} from "../components/ChatHeader";
import {ChatMessages} from "../components/ChatMessages";
import {MessageInput} from "../components/MessageInput";

// Message Interface
export interface Message {
    _id: string;
    chatId: string;
    sender: string;
    text?: string;
    image?: {
        url: string;
        publicId: string;
    };
    messageType: "text" | "image";
    seen: boolean;
    seenAt?: string;
    createdAt: string;
}

export const ChatApp = () => {
    const {isAuth, loading, logoutUser, user: loggedInUser, users, chats, fetchChats, setChats} = useAppData();

    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [showAllUser, setShowAllUser] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeOut, setTypingTimeOut] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth && !loading) {
            navigate("/login");
        }
    }, [isAuth, loading, navigate]);

    const handleLogout = () => logoutUser();

    // Fetch Chats
    async function fetchChat() {
        try {
            const token = Cookies.get("token");
            const {data} = await axios.get(`${chat_service}/messages/${selectedUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessages(data.messages);
            setUser(data.user);
            await fetchChats();
        } catch (error) {
            console.log(error);
            toast.error("Failed to Load Chats");
        }
    }
    // Create new Chat
    async function createChat(u: User) {
        try {
            const token = Cookies.get("token");
            const {data} = await axios.post(
                `${chat_service}/chat/new`,
                {userId: loggedInUser, otherUserId: u},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSelectedUser(data.chatId);
            setShowAllUser(false);
            await fetchChats();
        } catch (error) {
            toast.error("Failed to start chat");
        }
    }

    // Handle Message Send
    const handleMessageSend = async (e: any, imageFile?: File | null) => {
        e.preventDefault();
        if (!message.trim() && !imageFile) {
            return;
        }

        if (!selectedUser) {
            return;
        }
        // socket work
        const token = Cookies.get("token");
        try {
            const formData = new FormData();
            formData.append("chatId", selectedUser);

            if (message.trim()) {
                formData.append("text", message);
            }

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const {data} = await axios.post(`${chat_service}/message`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessages((prev) => {
                const currentMessages = prev || [];
                const messagesExists = currentMessages.some((msg) => msg._id === data.message._id);

                if (!messagesExists) {
                    return [...currentMessages, data.message];
                }
                return currentMessages;
            });

            setMessage("");
            const displayText = imageFile ? "📷" : message;
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    // Handle Typing Effect
    const handleTyping = (value: string) => {
        setMessage(value);

        if (selectedUser) {
            return;
        }

        // Socket setup
    };

    useEffect(() => {
        if (selectedUser) {
            fetchChat();
        }
    }, [selectedUser]);

    if (loading) {
        return <Loading></Loading>;
    }
    return (
        <div className="h-screen flex  text-gray-900 relative overflow-hidden  backdrop-blur-xl   items-stretch border-2 border-gray-600 rounded-2xl ">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                showAllUser={showAllUser}
                setShowAllUser={setShowAllUser}
                users={users}
                loggedInUser={loggedInUser}
                chats={chats}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                handleLogout={handleLogout}
                createChat={createChat}
            ></Sidebar>
            <div
                // style={{backgroundImage: "url(/backgroundImage.jpg)"}}
                className="flex-1  flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border-1 border-white/10 "
            >
                <ChatHeader user={user} setSidebarOpen={setSidebarOpen} isTyping={isTyping}></ChatHeader>

                <div className="flex-1 overflow-y-auto ">
                    <ChatMessages
                        selectedUser={selectedUser}
                        messages={messages}
                        loggedInUser={loggedInUser}
                    ></ChatMessages>
                </div>

                <MessageInput
                    selectedUser={selectedUser}
                    message={message}
                    setMessage={handleTyping}
                    handleMessageSend={handleMessageSend}
                ></MessageInput>
            </div>
        </div>
    );
};
