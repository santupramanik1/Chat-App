import React, {useEffect, useRef, useState} from "react";
import assets from "../assets/assets";
import {ArrowRight, ChevronRight, Loader2} from "lucide-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {useAppData, user_service} from "../context/AppContext";
import { Loading } from "./Loading";
import toast from "react-hot-toast";



export const VerifyOtp = () => {
    const {isAuth, setIsAuth, setUser,loading:userLoading,fetchChats,fetchUsers} = useAppData();
    const [loading, setLoading] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [error, setError] = useState<string>("");
    const [resendLoading, setResendLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const navigate = useNavigate();

    // Get the email from the URL Params
    const [searchParams] = useSearchParams();
    const email: string = searchParams.get("email") || "";

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleInputChange = (index: number, value: string): void => {
        if (!/^[0-9]?$/.test(value)) return;

        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Press Backspace go to the previous input box
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLElement>): void => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Paste the Otp By Pressing ctrl + V
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        const digits = pasteData.replace(/\D/g, "").slice(0, 6);

        if (digits.length == 6) {
            const newOtp = digits.split("");
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
        }
    };

    // console.log(timer);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length != 6) {
            setError("Please Enter 6 digits otp");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const {data} = await axios.post(`${user_service}/verify`, {email, otp: otpString});
            toast.success(data.message);
            Cookies.set("token", data.token, {
                expires: 15,
                secure: false,
                path: "/",
            });
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
            setUser(data.user);
            setIsAuth(true);

            // Without call this function it will not updated the status so manual refresh is required 
            fetchChats()
            fetchUsers()
            // navigate("/chat");
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    // Resend Otp
    const handleResendOtp = async () => {
        setResendLoading(true);
        setError("");
        try {
            const {data} = await axios.post(`${user_service}/login`, {email});
            toast.success(data.message);
            setTimer(60);
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setResendLoading(false);
        }
    };

    if(userLoading)
    {
      return <Loading></Loading>
    }

    if (isAuth) {
        navigate("/chat");
    }
    return (
        <div className="min-h-screen flex items-center object-cover object-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
            {/* LEFT SIDE IMAGE */}
            <img src={assets.logo_big} className="w-[min(30vw-250px)]"></img>

            {/* RIGHT SIDE LOGIN FORM */}
            <form
                onSubmit={handleSubmit}
                className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg "
            >
                <h2 className="font-medium text-2xl flex justify-center items-center relative">
                    Email Verify OTP
                    <button
                        onClick={() => navigate("/login")}
                        className="absolute left-2 top-5 cursor-pointer -translate-y-1/2 text-white text-4xl"
                    >
                        <ChevronRight />
                    </button>
                </h2>
                <p className="text-center">Enter 6-digit code sent to your email id </p>

                {/* OTP BOX */}
                <div className="flex gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el: HTMLInputElement | null) => {
                                inputRefs.current[index] = el;
                            }}
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index == 0 ? handlePaste : undefined}
                            type="text"
                            className="w-12 h-12 border bg-[#333A5C] text-center text-xl focus:outline-none  p-2 border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                        ></input>
                    ))}
                </div>

                {/* ERROR */}
                {error && (
                    <div className="bg-red-900 border border-red-700 rounded-lg p-3">
                        <p className="text-red-300 text-sm text-center">{error}</p>
                    </div>
                )}
                {/* BUTTON */}
                <button
                    type="submit"
                    className="py-2 font-medium bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer  rounded-md"
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <Loader2></Loader2>Verifying...
                        </div>
                    ) : (
                        <div className="flex justify-center items-center gap-2">
                            Verify
                            <span>
                                <ArrowRight></ArrowRight>
                            </span>
                        </div>
                    )}
                </button>

                <div>
                    <div className="flex gap-1 py-3 items-center justify-center">
                        <p className="text-white text-sm ">Didn't recieve the Code ? </p>
                    </div>

                    {timer > 0 ? (
                        <p className=" text-sm text-center">Resends Code in {timer} seconds</p>
                    ) : (
                        <div className="flex gap-1 py-3 items-center justify-center">
                            <button
                                onClick={handleResendOtp}
                                className="cursor-pointer text-violet-600 "
                                disabled={resendLoading}
                            >
                                {resendLoading ? "Sending..." : "Resend"}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};
