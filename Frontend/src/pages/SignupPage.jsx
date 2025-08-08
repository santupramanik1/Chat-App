import React, { useState } from "react";
import assets from "../assets/assets";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const initialFormData = { fullName: "", email: "", password: "" };

export const SignupPage = () => {
    const [formData, setFormData] = useState(initialFormData);

    const [isDataSubmitted, setIsDataSubmitted] = useState(false);
    // WHEN THE USER  SUBMIT THE FORM WE COLLECT THE USER CREDENTIALS
    const handleFormSubmit = (e) => {
        e.preventDefault();
        //THEN REDIRECT TO THE OTP_VERIFICATION PAGE
        navigate("/email-verify");
        // CLEAR THE FORM
        setFormData(initialFormData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center object-cover object-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
            {/* LEFT SIDE IMAGE */}
            <img src={assets.logo_big} className="w-[min(30vw-250px)]"></img>

            {/* RIGHT SIDE LOGIN FORM */}
            <form
                onSubmit={handleFormSubmit}
                className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg "
            >
                <h2 className="font-medium text-2xl flex justify-center items-center text-center">
                    Welcome To ChatApp
                </h2>

               
                    <>
                        {/* EMAIL */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="focus:outline-none  p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                                required
                            ></input>
                        </div>

                    </>
              

                {/* BUTTON */}
                <button
                    type="submit"
                    className="py-3 font-medium bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer text-sm rounded-md flex items-center justify-center gap-2"
                >
                    Send Verification Code <MoveRight />
                </button>

                <div>
                    <p className="text-gray-500 text-sm">Agree to the terms of use & privacy policy.</p>
                </div>
            </form>
        </div>
    );
};
