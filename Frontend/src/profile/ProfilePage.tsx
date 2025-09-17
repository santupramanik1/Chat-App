// import React, {useEffect, useState} from "react";
// import {useAppData, user_service} from "../context/AppContext";
// import Cookies from "js-cookie";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom";
// import {Loading} from "../components/Loading";
// import assets from "../assets/assets";
// import {ArrowLeft} from "lucide-react";

// export const ProfilePage = () => {
//     const {user, isAuth, loading, setUser} = useAppData();

//     const [isEdit, setIsEdit] = useState(false);
//     const [name, setName] = useState<string | undefined>("");

//     const navigate = useNavigate();
//     // Edit name
//     const editHandler = () => {
//         setIsEdit(!isEdit);
//         setName(user?.name);
//     };

//     const submitHandler = async (e: any) => {
//         e.preventDefault();
//         const token = Cookies.get("token");
//         try {
//             const {data} = await axios.post(
//                 `${user_service}/api/v1/update/user`,
//                 {name},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             Cookies.set("token", data.token, {
//                 expires: 15,
//                 secure: false,
//                 path: "/",
//             });

//             toast.success(data.message);
//             setUser(data.user);
//             setIsEdit(false);
//         } catch (error: any) {
//             toast.error(error.response.data.message);
//         }
//     };

//     useEffect(() => {
//         if (!isAuth && !loading) {
//             navigate("/login");
//         }
//     }, [isAuth, navigate, loading]);

//     if (loading) return <Loading />;
//     return (
//         <div className="min-h-screen bg-cover bg-no-repeat flex  justify-center items-center backdrop-blur-xl ">
//             <div className="w-5/6 max-w-2xl flex flex-col gap-2">
//                 {/* Profile Information */}
//                 <div className="flex text-white gap-2">
//                     <button
//                         onClick={() => navigate("/chat")}
//                         className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
//                     >
//                         <ArrowLeft className="w-5 h-5 text-gray-700" />
//                     </button>
//                     <div>
//                         <h3 className="font-bold text-2xl">Profile Setting</h3>
//                         <p>Manage your Account information</p>
//                     </div>
//                 </div>

//                 <div className="backdrop-blur-2xl text-gray-300 border-2 border-gray-600  flex flex-col items-center justify-between max-sm:flex-col-reverse rounded-lg max-sm:w-full max-sm:m-3">
//                     {/* Profile Header */}

//                     <div className="backdrop-blur-2xl text-gray-300 border-2 border-gray-600 bg-gray-200 shadow-md w-full">
//                         <h2 className="mt-4 text-xl font-bold text-gray-800">{user?.name || "User"}</h2>
//                         <p className="text-gray-500 text-sm mt-1">Active now</p>
//                     </div>
//                     <div className=" w-full flex items-center">
//                         {/* LEFT SIDE USER DATA E.G- BIO AND USER_PROFILE */}
//                         <form className="flex flex-col gap-5 p-10 flex-1">
//                             {/* NAME */}
//                             <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="your name"
//                                 className="border p-2 border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             ></input>
//                             {/* BIO */}
//                             <textarea
//                                 rows={4}
//                                 name="bio"
//                                 placeholder="Provide a short bio"
//                                 className="p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 required
//                             ></textarea>

//                             {/* BUTTON */}
//                             <button
//                                 type="submit"
//                                 className="py-2 font-medium bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer text-lg rounded-md"
//                             >
//                                 Save
//                             </button>
//                         </form>

//                         {/* RIGHT SIDE */}
//                         <div>
//                             <img
//                                 src={assets.logo_icon}
//                                 className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
//                             ></img>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// // };
// import  {useEffect, useState} from "react";
// import {useAppData, user_service} from "../context/AppContext";
// import Cookies from "js-cookie";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom";
// import {Loading} from "../components/Loading";
// import assets from "../assets/assets";
// import {ArrowLeft, UserCircle} from "lucide-react";

// export const ProfilePage = () => {
//     const {user, isAuth, loading, setUser} = useAppData();

//     const [isEdit, setIsEdit] = useState(false);
//     const [name, setName] = useState<string | undefined>("");

//     const navigate = useNavigate();

//     const editHandler = () => {
//         setIsEdit(!isEdit);
//         setName(user?.name);
//     };

//     const submitHandler = async (e: any) => {
//         e.preventDefault();
//         const token = Cookies.get("token");
//         try {
//             const {data} = await axios.post(
//                 `${user_service}/api/v1/update/user`,
//                 {name},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             Cookies.set("token", data.token, {
//                 expires: 15,
//                 secure: false,
//                 path: "/",
//             });

//             toast.success(data.message);
//             setUser(data.user);
//             setIsEdit(false);
//         } catch (error: any) {
//             toast.error(error.response.data.message);
//         }
//     };

//     useEffect(() => {
//         if (!isAuth && !loading) {
//             navigate("/login");
//         }
//     }, [isAuth, navigate, loading]);

//     if (loading) return <Loading />;

//     console.log("user name :",name)

//     return (
//         <div className="min-h-screen bg-cover bg-no-repeat flex justify-center items-center backdrop-blur-xl p-4 sm:p-6">
//             <div className="w-full max-w-2xl flex flex-col gap-4">
//                 {/* Header */}
//                 <div className="flex items-center text-white gap-3">
//                     <button
//                         onClick={() => navigate("/chat")}
//                         className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
//                     >
//                         <ArrowLeft className="w-5 h-5 text-gray-700" />
//                     </button>
//                     <div>
//                         <h3 className="font-bold text-2xl">Profile Setting</h3>
//                         <p className="text-sm text-gray-300">Manage your Account information</p>
//                     </div>
//                 </div>

//                 {/* Profile Card */}
//                 <div className="backdrop-blur-2xl border border-gray-600 text-white shadow-md rounded-lg overflow-hidden">
//                     {/* Profile Header */}
//                     <div className="flex  items-center mt-8 mb-6">
//                         <div className="flex items-center gap-2 ml-8 text-white">
//                             <div className="relative">
//                                 <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
//                                     <UserCircle className="w-16 h-16 text-gray-500" />
//                                 </div>
//                                 {/* Green Active Dot */}
//                                 <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
//                             </div>
//                             <div className="flex flex-col text-white">
//                                 <h2 className="mt-4 text-xl font-bold ">{user?.name || "User"}</h2>
//                                 <p className=" text-sm mt-1">Active now</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="pl-6">
//                         <label>Display Name</label>
//                     </div>

//                     {/* Content: flex row on large screens, col on mobile */}
//                     <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
//                         {/* LEFT SIDE (Form) */}

//                         {isEdit ? (
//                             <form onSubmit={submitHandler} className="flex flex-col gap-4 flex-1 w-full">
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Your name"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 />

//                                 <div className="flex flex-col sm:flex-row gap-3 w-full">
//                                     <button
//                                         type="button"
//                                         onClick={submitHandler}
//                                         className="flex-1 py-2 px-4 font-medium bg-gradient-to-r from-purple-500 to-violet-600 text-white text-lg cursor-pointer rounded-md hover:opacity-90 transition text-center"
//                                     >
//                                         Save changes
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setIsEdit(false)} // cancel action
//                                         className="flex-1 py-2 px-4 font-medium bg-red-500 text-gray-800 text-lg rounded-md hover:bg-red-600 cursor-pointer transition text-center"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </form>
//                         ) : (
//                             <div
//                                 className="flex  items-center justify-between w-full  p-6 gap-3 bg-gray-900 border border-gray-700 rounded-lg
//                 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                             >
//                                 <p className="text-white font-medium ">{user?.name || "Not set"}</p>
//                                 <button
//                                     type="button"
//                                     onClick={editHandler}
//                                     className=" py-2 px-4 font-medium bg-gradient-to-r from-purple-500 to-violet-600 text-white text-lg cursor-pointer rounded-md hover:opacity-90 transition text-center"
//                                 >
//                                     Edit
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

"use client";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import {ArrowLeft, Save, User, UserCircle} from "lucide-react";
import {useAppData, user_service} from "../context/AppContext";
import {useNavigate} from "react-router-dom";
import {Loading} from "../components/Loading";

export const ProfilePage = () => {
    const {user, isAuth, loading, setUser} = useAppData();
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState<string | undefined>("");
    const navigate = useNavigate();

    const editHandler = () => {
        setIsEdit(!isEdit);
        setName(user?.name);
    };

    const submitHandler = async (e: any) => {
        e.preventDefault();
        const token = Cookies.get("token");
        try {
            const {data} = await axios.post(
                `${user_service}/api/v1/update/user`,
                {name},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Cookies.set("token", data.token, {
                expires: 15,
                secure: false,
                path: "/",
            });

            toast.success(data.message);
            setUser(data.user);
            setIsEdit(false);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (!isAuth && !loading) {
            navigate("/login");
        }
    }, [isAuth, navigate, loading]);

    if (loading) return <Loading />;
    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <div className="max-w-2xl mx-auto pt-8">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/chat")}
                        className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-300" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                        <p className="text-gray-400 mt-1">Manage your account information</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                    <div className="bg-gray-700 p-8 border-b border-gray-600">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
                                    <UserCircle className="w-12 h-12 text-gray-300" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-1">{user?.name || "User"}</h2>
                                <p className="text-gray-300 text-sm">Active now</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-3">Display Name</label>

                                {isEdit ? (
                                    <form onSubmit={submitHandler} className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                                            />
                                            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                                            >
                                                <Save className="w-4 h-4" /> Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={editHandler}
                                                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600">
                                        <span className="text-white font-medium text-lg">
                                            {user?.name || "Not set"}
                                        </span>
                                        <button
                                            onClick={editHandler}
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
