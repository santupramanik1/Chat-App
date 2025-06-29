import React from "react";
import {useNavigate} from "react-router-dom";
import assets, {userDummyData} from "../assets/assets";
export const Sidebar = ({selectedUser, setSelectedUser}) => {
    const navigate = useNavigate();
    return (
        <div
            className={`bg-[#8185B2]/10 h-full  rounded-r-xl overflow-y-scroll text-white ${
                selectedUser ? "max-md:hidden" : ""
            }`}
        >
            <div className="pb-5 p-3">
                {/* LOGO */}
                <div className="flex items-center justify-between p-2">
                    <img src={assets.logo} className="max-w-40"></img>
                    {/* MENU ICON */}
                    <div className="relative group">
                        <img src={assets.menu_icon} className="max-h-5 cursor-pointer"></img>

                        {/* SUB_MENU ITEM */}
                        <div className="bg-[#282142] rounded-md border border-gray-600 p-5 w-32 absolute right-0 text-gray-100 z-20 top-full hidden group-hover:block">
                            <p onClick={() => navigate("/profile")} className="cursor-pointer">
                                Edit Profile
                            </p>
                            <hr className="my-2 border-t-2 border-gray-500"></hr>
                            <p onClick={() => navigate("/login")} className="cursor-pointer">
                                Logout
                            </p>
                        </div>
                    </div>
                </div>

                {/* SEARCH BOX */}
                <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
                    <img src={assets.search_icon} className="w-3"></img>
                    <input
                        type="text"
                        placeholder="Search User.."
                        className="bg-none bg-transparent outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
                    ></input>
                </div>
            </div>

            {/* LIST OF USER */}
            <div className="flex  flex-col p-3">
                <div className="flex flex-col">
                    {userDummyData.map((user, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedUser(user)}
                            className={`flex gap-2 items-center cursor-pointer relative p-2 pl-4 rounded sm:text-sm ${
                                selectedUser?._id === user._id && "bg-[#282142]/50 "
                            }`}
                        >
                            <img
                                src={user?.profilePic || assets.avatar_icon}
                                className="w-[35px] rounded-full aspect-[1/1] "
                            ></img>
                            <div className="flex flex-col leading-5">
                                <p>{user.fullName}</p>
                                {index < 3 ? (
                                    <span className="text-green-400 text-xs">Online</span>
                                ) : (
                                    <span className="text-gray-400 text-xs">Offline</span>
                                )}
                            </div>

                            {index > 2 && (
                                <p className="absolute w-5 h-5 flex items-center justify-center text-sm top-4 rounded-full bg-violet-500/50 right-4 ">
                                    {index}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
