import {createContext, useContext, useEffect, useState, type ReactNode} from "react";
import {io, type Socket} from "socket.io-client";
import {chat_service, useAppData} from "./AppContext";

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: [],
});

interface ProviderProps {
    children: ReactNode;
}
console.log("Connecting to:", chat_service);


export const SocketProvider = ({children}: ProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const {user} = useAppData();

//     useEffect(() => {
//     console.log("User Data:", user);
//     if (!user?._id) {
//         console.log("No user ID, skipping socket connection");
//         return;
//     }
//     // ... rest of the code
// }, [user?._id]);
    useEffect(() => {
        if (!user?._id) return;

        const newSocket = io(chat_service, {
            query: {
                userId: user._id,
            },
        });
        setSocket(newSocket);

        newSocket.on("getOnlineUser", (users: string[]) => {
            setOnlineUsers(users);
        });
        return () => {
            newSocket.disconnect();
        };
    }, [user?._id]);

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children} </SocketContext.Provider>;
};

export const SocketData = () => useContext(SocketContext);
