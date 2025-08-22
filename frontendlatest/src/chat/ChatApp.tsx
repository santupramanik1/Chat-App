import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppData, type User} from "../context/AppContext";
import {Loading} from "../components/Loading";
import {Sidebar} from "../components/Sidebar";

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
    const [sidebarOpen, setSideBarOpen] = useState(false);
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

    const handleLogout =() => logoutUser();
    if (loading) {
        return <Loading></Loading>;
    }
    return (
        <div className="min-h-screen flex  text-white backdrop-blur-xl   items-stretch border-2 border-gray-600 rounded-2xl overflow-hidden relative  ">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSideBarOpen}
                showAllUser={showAllUser}
                setShowAllUser={setShowAllUser}
                users={users}
                loggedInUser={loggedInUser}
                chats={chats}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                handleLogout={handleLogout}
            ></Sidebar>
        </div>
    );
};
