import React from "react";
import type {User} from "../context/AppContext";

interface ChatsSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    showAllUser: boolean;
    setShowAllUser: (show: boolean | ((prev: boolean) => boolean)) => void;
    users: User[] | null;
    loggedInUser: User | null;
    chats: any[] | null;
    selectedUser: string | null;
    setSelectedUser: (userId: string | null) => void;
    handleLogout: () => void|Promise<void>;
}
export const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    showAllUser,
    users,
    loggedInUser,
    chats,
    selectedUser,
    setSelectedUser,
    handleLogout,
}: ChatsSidebarProps) => {
    return <div>Sidebar</div>;
};
