import {Menu, UserCircle} from "lucide-react";
import React from "react";
import type {User} from "../context/AppContext";

interface ChatHeaderProps {
    user: User | null;
    setSidebarOpen: (open: boolean) => void;
    isTyping: boolean;
    onlineUsers: string[];
}
export const ChatHeader = ({user, setSidebarOpen, isTyping, onlineUsers}: ChatHeaderProps) => {
    const isOnlineUser = user && onlineUsers.includes(user._id);
    return (
        <>
            {/* Mobile menu toggle */}
            <div className="sm:hidden fixed top-4 right-4 z-30">
                <button
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="w-5 h-5 text-gray-200" />
                </button>
            </div>

            {/* Chat Header */}
            <div className="mb-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
                                    <UserCircle className="w-8 h-8 text-gray-300" />
                                </div>
                                {/* Online user setup */}
                                {isOnlineUser && (
                                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white">
                                        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-70"></span>
                                    </span>
                                )}
                            </div>

                            {/* User info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-2xl font-bold text-white truncate">{user.name}</h2>
                                </div>
                                {/* To show typing status */}
                                <div className="flex items-center gap-2">
                                    {isTyping ? (
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-blue-500"></div>
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full animate-bounce bg-blue-500"
                                                    style={{animationDelay: "0.1s"}}
                                                ></div>
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full animate-bounce bg-blue-500"
                                                    style={{animationDelay: "0.2s"}}
                                                ></div>

                                                <span className="text-blue-400 font-medium">typing...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    isOnlineUser ? "bg-green-500" : "bg-gray-400"
                                                }`}
                                            ></div>

                                            <span
                                                className={`font-medium ${
                                                    isOnlineUser ? "text-green-600" : "text-gray-500"
                                                }`}
                                            >
                                                {isOnlineUser ? "Online" : "Offline"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
                                <UserCircle className="w-8 h-8 text-gray-300" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-400">Select a conversation</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Choose a chat from the sidebar to start messaging
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
