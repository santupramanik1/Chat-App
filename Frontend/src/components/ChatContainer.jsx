import React, {useEffect, useRef} from "react";
import assets, {messagesDummyData} from "../assets/assets";
import {formatMessageTime} from "../library/utils";

export const ChatContainer = ({selectedUser, setSelectedUser}) => {
    // SCROLL TO THE NEW MESSAGE
    const scrolEnd = useRef();
    useEffect(() => {
        if (scrolEnd.current) {
            scrolEnd.current.scrollIntoView({behavior: "smooth"});
        }
    }, []);

    return selectedUser ? (
        <div className="h-full overflow-scroll relative backdrop-blur-lg">
            {/* HEADER */}
            <div className="flex items-center justify-between py-3  border-b border-stone-500 mx-4  ">
                <div className="flex gap-2">
                    <img src={assets.profile_martin} className=" rounded-full w-8"></img>
                    <p className="flex items-center gap-2 text-lg text-white ">
                        Martin Johnson
                        <span className="w-2 h-2 bg-green-500 rounded-full "></span>
                    </p>
                </div>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} className="md:hidden max-w-7"></img>
                <img src={assets.help_icon} className="max-md:hidden max-w-5"></img>
            </div>

            {/* CHAT AREA */}
            <div className="flex flex-col overflow-y-scroll p-3 pb-6 h-[calc(100%-120px)]">
                {messagesDummyData.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-end gap-2 justify-end  ${
                            msg.senderId !== "680f5116f10f3cd28382ed02" && "flex-row-reverse"
                        }`}
                    >
                        {msg.image ? (
                            <img
                                src={msg.image}
                                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                            ></img>
                        ) : (
                            <p
                                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                                    msg.senderId === "680f5116f10f3cd28382ed02" ? "rounded-br-none" : "rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </p>
                        )}
                        <div className="text-xs text-center">
                            <img
                                src={`${
                                    msg.senderId === "680f5116f10f3cd28382ed02"
                                        ? assets.avatar_icon
                                        : assets.profile_martin
                                }`}
                                className="rounded-full w-7"
                            ></img>
                            <p className="text-gray-500">{formatMessageTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                {/* SCROLL TO THE NEW MESSAGE AREA */}
                <div ref={scrolEnd}></div>
            </div>

            {/* BOTTOM AREA THAT CONTAIN TEXT FOR SEND THE MESSAGE AND THE MEDIA */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
                <div className="flex items-center rounded-full bg-gray-100/12 flex-1 px-3">
                    <input
                        type="text"
                        placeholder="Send a message"
                        className="outline-none border-none rounded-lg  placeholder-gray-400 text-white p-3 text-sm flex-1"
                    ></input>
                    <input type="file" id="image" accept="image/png,image/jpeg" hidden></input>
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} className="w-5 cursor-pointer"></img>
                    </label>
                </div>
                <img src={assets.send_button} className="w-7 cursor-pointer"></img>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center flex-col gap-2 text-gray-500 h-full bg-white/10 max-md:hidden">
            <img src={assets.logo_icon} className="max-w-16"></img>
            <p className="text-white text-lg font-medium">Chat anytime, anywhere</p>
        </div>
    );
};
