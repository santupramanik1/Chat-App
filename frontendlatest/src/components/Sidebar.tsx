import React, {useState} from "react";
import type {User} from "../context/AppContext";
import {CornerDownRight, CornerUpLeft, LogOut, MessageCircle, Plus, Search, UserCircle, X} from "lucide-react";
import {Link} from "react-router-dom";

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
    handleLogout: () => void | Promise<void>;
    createChat: (user: User) => void;
}
export const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    showAllUser,
    setShowAllUser,
    users,
    loggedInUser,
    chats,
    selectedUser,
    setSelectedUser,
    handleLogout,
    createChat,
}: ChatsSidebarProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    console.log(chats);
    return (
        <aside
            className={`fixed sm:static z-20 top-0 left-0 h-screen w-80 border-r border-gray-700 bg-gray-900 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 transition-transform duration-300 flex flex-col`}
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
                <div className="sm:hidden justify-end flex mb-0">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 hover:bg-gray-700 transition-colors rounded-lg"
                    >
                        <X className="w-5 h-5 text-gray-300"></X>
                    </button>
                </div>

                {/* User */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 ">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{showAllUser ? "New Chat" : "Messages"}</h2>
                    </div>
                    <button
                        className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
                            showAllUser
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                        onClick={() => setShowAllUser((prev) => !prev)}
                    >
                        {showAllUser ? <X className="w-4 h-4"></X> : <Plus className="w-4 h-4"></Plus>}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1  overflow-hidden px-4 py-2">
                {showAllUser ? (
                    <div className="space-y-4 h-full">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2  transform -translate-y-1/2 w-4 h-4 text-gray-400"></Search>
                            <input
                                type="text"
                                placeholder="Search User... "
                                className="w-full pl-10 pr-4 py-3   border-gray-700 text-white placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            ></input>
                        </div>

                        {/* User List */}
                        <div className="space-y-2 overflow-y-auto h-full pb-4">
                            {users
                            ?.filter(
                                (u) =>
                                    u._id !== loggedInUser?._id &&
                                    u.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((u) => (
                                <button
                                    key={u._id}
                                    onClick={() => createChat(u)}
                                    className="w-full text-left p-4 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800 transition-colors"
                                >
                                    <div className="flex items-center gap-3 ">
                                        <div className="relative">
                                            <UserCircle className="h-6 w-6 text-gray-300"></UserCircle>
                                        </div>
                                        {/* Online Symbol */}
                                        <div className="flex-1 min-w-0">
                                            <span className="font-medium text-white ">{u.name}</span>
                                            <div className="text-sm mt-0.5 text-gray-400">
                                                {/* To show online /offline text */}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : chats && chats.length > 0 ? (
                    <div className="space-y-2 overflow-y-auto h-full pb-4 ">
                        {chats.map((chat) => {
                            const latestMessage = chat.chat.latestMessage;
                            const isSelected = selectedUser === chat.chat._id;
                            const isSentByMe = latestMessage?.sender === loggedInUser?._id;
                            const unseenCount = chat.chat.unseenCount || 0;

                            return (
                                <button
                                    key={chat.chat._id}
                                    onClick={() => {
                                        setSelectedUser(chat.chat._id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full cursor-pointer rounded-lg transition-colors  text-left p-4 ${
                                        isSelected
                                            ? "bg-blue-600 border border-blue-500"
                                            : " border border-gray-700 hover:border-gray-600"
                                    }`}
                                >
                                    <div className="flex gap-3 items-center">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                                <UserCircle className="w-7 h-7 text-gray-300"></UserCircle>
                                                {/* Online user work here */}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 ">
                                            <div className="flex items-center justify-between mb-1">
                                                <span
                                                    className={`font-semibold truncate ${
                                                        isSelected ? "text-white" : "text-gray-200"
                                                    }`}
                                                >
                                                    {chat.user.name}
                                                </span>
                                                {unseenCount == 0 && (
                                                    <div className="bg-red-600 text-xs font-bold rounded-lg text-white flex items-center justify-center px-2 h-5.5 min-w-[22px]">
                                                        {unseenCount > 99 ? "99+" : unseenCount}
                                                    </div>
                                                )}
                                            </div>
                                            {latestMessage && (
                                                <div className=" flex gap-2 items-center">
                                                    {isSentByMe ? (
                                                        <CornerUpLeft
                                                            size={14}
                                                            className="text-blue-400 text-shrink-0"
                                                        />
                                                    ) : (
                                                        <CornerDownRight
                                                            size={14}
                                                            className="text-green-400 text-shrink-0"
                                                        ></CornerDownRight>
                                                    )}
                                                    <span className="text-sm text-gray-400 truncate flex-1">
                                                        {latestMessage.text}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col h-full justify-center items-center text-center border">
                        <div className="p-4 bg-gray-800 rounded-full mb-4">
                            <MessageCircle className="w-8 h-8 text-gray-400"></MessageCircle>
                        </div>
                        <p className="text-gray-400 font-medium">No Conversation Yet</p>
                        <p className="text-sm text-gray-500 mt-1">Start a new Chat to begin messaging</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 space-y-2 border-t border-gray-700">
                <Link
                    to={"/profile"}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <div className="p-1.5 bg-gray-700 rounded-lg">
                        <UserCircle className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="font-medium text-gray-300">Profile</span>
                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-red-500 hover:text-white"
                >
                    <div className="p-1.5 bg-red-600 rounded-lg">
                        <LogOut className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
