import React, {useState} from "react";
import {Sidebar} from "../components/Sidebar";
import {ChatContainer} from "../components/ChatContainer";
import {RightSidebar} from "../components/RightSidebar";
export const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState(false); // Determines how many components/items should be displayed on the home page

    return (
        <div className="w-full h-screen border-5 sm:px-[15%] sm:py-[5%]">
            <div
                className={`backdrop-blur-xl h-[100%]  items-stretch border-2 border-gray-600 rounded-2xl grid grid-cols-1 relative overflow-hidden  ${
                    selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr] " : "md:grid-cols-2"
                }`}
            >
                <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}></Sidebar>
                <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}></ChatContainer>
                <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}></RightSidebar>
            </div>
        </div>
    );
};
