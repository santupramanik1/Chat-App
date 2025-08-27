import React, {useEffect, useMemo, useRef} from "react";
import type {Message} from "../chat/ChatApp";
import type {User} from "../context/AppContext";
import {UserCircle} from "lucide-react";

interface ChatMessagesProps {
    selectedUser: string | null;
    messages: Message[] | null;
    loggedInUser: User | null;
}

export const ChatMessages = ({selectedUser, messages, loggedInUser}: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Seen features
    const uniqueMessage = useMemo(() => {
        if (!messages) {
            return [];
        }

        const seen = new Set();
        return messages.filter((message) => {
            if (seen.has(message._id)) {
                return false;
            }
            seen.add(message._id);
            return true;
        });
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [selectedUser, uniqueMessage]);
    return (
        <div className="flex-1 ">
            <div className="h-full space-y-2 overflow-y-auto max-w-[100vh-215px] custom-scroll">
                {!selectedUser ? (
                    <p className="text-gray-400 text-center mt-20">Please select a user to start chatting 📩</p>
                ) : (
                    <>
                        {uniqueMessage.map((e, i) => {
                            const isSentByMe = e.sender === loggedInUser?._id;
                            const uniqueKey = `${e._id}-${i}`;

                            return (
                                <div
                                    key={uniqueKey}
                                    className={`flex flex-col gap-1 mt-2 ${isSentByMe ? "items-end" : "items-start"}`}
                                >
                                    <div className=" flex items-end gap-2 ">
                                        <UserCircle className="" size={30}></UserCircle>
                                        <div
                                            className={`rounded-lg p-3 max-w-sm mb-2 ${
                                                isSentByMe ? "bg-blue-600 text-white" : "bg-gray-700 text-white rounded-bl-none"
                                            }`}
                                        >
                                            {e.messageType === "image" && e.image && (
                                                <div className="relative group">
                                                    <img
                                                        src={e.image.url}
                                                        alt="shared Image"
                                                        className="max-w-full h-auto rounded-lg"
                                                    ></img>
                                                </div>
                                            )}

                                            {e.text && <p className="mt-1">{e.text}</p>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};
