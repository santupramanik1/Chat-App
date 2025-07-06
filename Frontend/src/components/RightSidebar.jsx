import React from "react";
import assets, {imagesDummyData} from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const RightSidebar = ({selectedUser}) => {
  const navigate=useNavigate()
    return (
        selectedUser && (
            <div
                className={`bg-[#8185B2]/10 text-white overflow-y-scroll relative w-full ${
                    selectedUser ? "max-md:hidden" : ""
                }`}
            >
                {/* USER PROFLE */}
                <div className="pt-16 flex flex-col items-center gap-2 text-xs  font-light mx-auto">
                    <img
                        src={selectedUser?.profilePic || assets.avatar_icon}
                        className="w-20 aspect-[1/1] rounded-full"
                    ></img>
                    <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
                        <p className="bg-green-500 rounded-full w-2 h-2"></p>
                        {selectedUser.fullName}
                    </h1>
                    <p className="mx-auto px-10"> {selectedUser.bio}</p>
                </div>

                <hr className="w-full text-gray-500 my-4"></hr>

                {/* DISPLAY THE MEDIA */}
                <div className="px-5 text-xs">
                    <p>Media</p>
                    <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2  gap-4 opacity-80">
                        {imagesDummyData.map((url, index) => (
                            <div key={index} onClick={() => window.open(url)} className="cursor-pointer rounded">
                                <img src={url} className="h-full rounded-md"></img>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LOGOUT BUTTON */}
                <button onClick={()=>{navigate("/login")}} className="py-2 px-20 absolute  bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer text-sm font-light rounded-full">
                    Logout
                </button>
            </div>
        )
    );
};
