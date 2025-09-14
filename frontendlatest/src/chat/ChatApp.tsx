import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chat_service, useAppData, type User } from "../context/AppContext";
import { Loading } from "../components/Loading";
import { Sidebar } from "../components/Sidebar";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessages } from "../components/ChatMessages";
import { MessageInput } from "../components/MessageInput";
import { SocketData } from "../context/SocketContext";

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
  const {
    isAuth,
    loading,
    logoutUser,
    user: loggedInUser,
    users,
    chats,
    fetchChats,
    setChats
  } = useAppData();

  const { onlineUsers, socket } = SocketData();
  console.log("online users:", onlineUsers);

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
      const { data } = await axios.get(
        `${chat_service}/api/v1/messages/${selectedUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessages(data.messages);
      setUser(data.user);
      await fetchChats();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Load Chats");
    }
  }

  // Move to the new chat
  const moveChatToTop = (
    chatId: string,
    newMessage: any,
    updatedUnseenCount = true
  ) => {
    setChats((prev) => {
      if (!prev) return null;

      const updatedChats = [...prev];
      const chatIndex = updatedChats.findIndex(
        (chat) => chat.chat._id === chatId
      );

      if (chatIndex !== -1) {
        const [moveChat] = updatedChats.splice(chatIndex, 1);

        const updatedChat = {
          ...moveChat,
          chat: {
            ...moveChat.chat,
            latestMessage: {
              text: newMessage.text,
              sender: newMessage.sender
            },
            updatedAt: new Date().toString(),

            unseenCount:
              updatedUnseenCount && newMessage.sender !== loggedInUser?._id
                ? (moveChat.chat.unseenCount || 0) + 1
                : moveChat.chat.unseenCount || 0
          }
        };
        updatedChats.unshift(updatedChat);
      }

      return updatedChats;
    });
  };

  // Reset unseenCount

  // Create new Chat
  async function createChat(u: User) {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${chat_service}/api/v1/chat/new`,
        { userId: loggedInUser, otherUserId: u },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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

    // Stop typing when sending message
    // socket work
    if (typingTimeOut) {
      clearTimeout(typingTimeOut);
      setTypingTimeOut(null);
    }

    socket?.emit("stopTyping", {
      chatId: selectedUser,
      userId: loggedInUser?._id
    });

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

      const { data } = await axios.post(
        `${chat_service}/api/v1/message`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setMessages((prev) => {
        const currentMessages = prev || [];
        const messagesExists = currentMessages.some(
          (msg) => msg._id === data.message._id
        );

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

    if (selectedUser && !socket) {
      return;
    }

    // Socket setup
    if (value.trim()) {
      socket?.emit("typing", {
        chatId: selectedUser,
        userId: loggedInUser?._id
      });
    }

    if (typingTimeOut) {
      clearTimeout(typingTimeOut);
    }

    const timeout = setTimeout(() => {
      socket?.emit("stopTyping", {
        chatId: selectedUser,
        userId: loggedInUser?._id
      });
    }, 2000);

    setTypingTimeOut(timeout);
  };

  useEffect(() => {
    socket?.on("userTyping", (data) => {
      console.log("Recived user typing ", data);
      if (data.chatId === selectedUser && data.userId !== loggedInUser?._id) {
        setIsTyping(true);
      }
    });

    socket?.on("userStoppedTyping", (data) => {
      console.log("Recived user stopped typing ", data);
      if (data.chatId === selectedUser && data.userId !== loggedInUser?._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket?.off("userTyping");
      socket?.off("userStoppedTyping");
    };
  }, [selectedUser, socket, loggedInUser?._id]);

  useEffect(() => {
    if (selectedUser) {
      fetchChat();
      setIsTyping(false);

      socket?.emit("joinChat", selectedUser);

      return () => {
        socket?.emit("leaveChat", selectedUser);
        setMessages(null);
      };
    }
  }, [selectedUser, socket]);

  useEffect(() => {
    return () => {
      if (typingTimeOut) {
        clearTimeout(typingTimeOut);
      }
    };
  }, [typingTimeOut]);

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
        onlineUsers={onlineUsers}
      ></Sidebar>
      <div
        // style={{backgroundImage: "url(/backgroundImage.jpg)"}}
        className="flex-1  flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border-1 border-white/10 "
      >
        <ChatHeader
          user={user}
          setSidebarOpen={setSidebarOpen}
          isTyping={isTyping}
          onlineUsers={onlineUsers}
        ></ChatHeader>

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
