import React, {useState} from "react";
import assets from "../assets/assets";
import {useNavigate} from "react-router-dom";

const intialProfileData = {name: "Martin Johnson", bio: "Hi i am using quickchat"};
export const ProfilePage = () => {
    const [seletedImage, setSeletedImage] = useState(null);
    const navigate = useNavigate();
    const [updateProfile, setUpdateProfileData] = useState(intialProfileData);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdateProfileData((prevProfileData) => ({...prevProfileData, [name]: value}));
    };

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        navigate("/")
    };
    console.log(seletedImage);
    return (
        <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center ">
            <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg max-sm:w-full max-sm:m-3">
                {/* LEFT SIDE USER DATA E.G- BIO AND USER_PROFILE */}
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 p-10 flex-1">
                    <h3>Profile Details</h3>
                    <label htmlFor="avatar" className="flex items-center gap-2 cursor-pointer">
                        <input
                            onChange={(e) => setSeletedImage(e.target.files[0])}
                            type="file"
                            id="avatar"
                            accept=".png, .jpg, .jpeg"
                            hidden
                        ></input>
                        <img
                            src={seletedImage ? URL.createObjectURL(seletedImage) : assets.avatar_icon}
                            className={`w-12 h-12 ${seletedImage && "rounded-full"}`}
                        ></img>
                        upload profile image
                    </label>
                    {/* NAME */}
                    <input
                        type="text"
                        value={updateProfile.name}
                        onChange={handleInputChange}
                        name="name"
                        placeholder="your name"
                        className="border p-2 border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></input>
                    {/* BIO */}
                    <textarea
                        rows={4}
                        value={updateProfile.bio}
                        onChange={handleInputChange}
                        name="bio"
                        placeholder="Provide a short bio"
                        className="p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    ></textarea>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="py-2 font-medium bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer text-lg rounded-md"
                    >
                        Save
                    </button>
                </form>

                {/* RIGHT SIDE */}
                <div>
                    <img
                        src={assets.logo_icon}
                        className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
                    ></img>
                </div>
            </div>
        </div>
    );
};
