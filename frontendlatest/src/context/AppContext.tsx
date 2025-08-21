import type {AxiosProxyConfig} from "axios";
import React, {createContext, useContext, useEffect, useState, type ReactNode} from "react";
import Cookies from "js-cookie";
import axios from "axios";

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
        try {
            const token = Cookies.get("token");
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

    useEffect(() => {
        fetchUser();
    }, []);

    return <AppContext.Provider value={{user, setUser, isAuth, setIsAuth, loading}}>{children}</AppContext.Provider>;
};

export const useAppData = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useappdata must be used within AppProvider");
    }
    return context;
};
