import React, {createContext, useContext, useEffect, useState, type ReactNode} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export const user_service = "http://localhost:4000/api/v1";
export const mail_service = "http://localhost:4001/api/v1";
export const chat_service = "http://localhost:4002/api/v1";

// For user interface
export interface User {
    _id: string;
    name: string;
    email: string;
}

// For chat interface
export interface Chat {
    _id: string;
    user: string;
    latestMessage: {
        text: string;
        sender: string;
    };
    createdAt: string;
    updatedAt: string;
    unseenCount?: number;
}

export interface Chats {
    _id: string;
    user: string;
    chat: string;
}

interface AppContextType {
    user: User | null;
    loading: boolean;
    isAuth: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    logoutUser: () => Promise<void>;
    fetchUsers: () => Promise<void>;
    fetchChats: () => Promise<void>;
    chats: Chats[] | null;
    users: User[] | null;
    setChats: React.Dispatch<React.SetStateAction<Chats[] | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch the user
    async function fetchUser() {
        const token = Cookies.get("token");
        try {
            const {data} = await axios.get(`${user_service}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(data);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Logout user
    async function logoutUser() {
        Cookies.remove("token");
        setUser(null);
        setIsAuth(false);
        toast.success("User Logout ");
    }

    // Fetch chats
    const [chats, setChats] = useState<Chats[] | null>(null);
    async function fetchChats() {
        const token = Cookies.get("token");
        try {
            const {data} = await axios.get(`${chat_service}/chat/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setChats(data.chats);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch all the user
    const [users, setUsers] = useState<User[] | null>(null);

    async function fetchUsers() {
        const token = Cookies.get("token");
        try {
            const {data} = await axios.get(`${user_service}/user/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchChats();
        fetchUsers();
    }, []);

    return (
        <AppContext.Provider value={{user, setUser, isAuth, setIsAuth, loading,logoutUser,fetchUsers,fetchChats,chats,users,setChats}}>
            {children} <Toaster></Toaster>
        </AppContext.Provider>
    );
};

// This is the custom hook
export const useAppData = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useappdata must be used within AppProvider");
    }
    return context;
};
