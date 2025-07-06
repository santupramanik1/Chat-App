import React, {useEffect, useRef, useState} from "react";
import assets from "../assets/assets";
import {formatOtpExpireTime} from "../library/utils";

export const EmailVerifyPage = () => {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);
    const handleChange = (index, e) => {
        const value = e.target.value;

        // IF THE DIGIT NOT A NUMBER DONT ALLOW
        if (isNaN(value)) {
            return;
        }
        const newValue = value.trim();
        const newOtpArray = [...otp];
        newOtpArray[index] = newValue;
        setOtp(newOtpArray);

        if (newValue && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleClick = (index) => {};

    // AS SOON AS THE COPONENT RENDER ALWAYS FOCCUS TO THE FIRST UNPUT BOX
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // SET TIMER FOR THE OTP EXPIRE
    const [timeLeft, setTimeLeft] = useState(30);
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                // STOP THE TIMER BEFORE GOING TO THE 0
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center object-cover object-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
            {/* LEFT SIDE IMAGE */}
            <img src={assets.logo_big} className="w-[min(30vw-250px)]"></img>

            {/* RIGHT SIDE LOGIN FORM */}
            <form className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg ">
                <h2 className="font-medium text-2xl flex justify-center items-center">Email Verify OTP</h2>
                <p className="text-center">Enter 6-digit code sent to your email id </p>

                {/* OTP BOX */}
                <div className="flex gap-2">
                    {otp.map((_, index) => (
                        <input
                            type="text"
                            maxLength={1}
                            value={otp[index]}
                            key={index}
                            ref={(input) => (inputRefs.current[index] = input)}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onClick={() => handleClick(index)}
                            className="w-12 h-12 border bg-[#333A5C] text-center text-xl focus:outline-none  p-2 border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                        ></input>
                    ))}
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="py-2 font-medium text-lg bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer  rounded-md"
                >
                    Verify
                </button>

                <div>
                    <p>{formatOtpExpireTime(timeLeft)}</p>
                    <div className="flex gap-1 py-3 items-center justify-center">
                        <p className="text-white text-sm ">Didn't recieve the Code ? </p>
                        <button className="cursor-pointer text-violet-600 ">
                            <span>Resend Code</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
