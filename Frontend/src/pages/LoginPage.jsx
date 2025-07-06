import React, {useState} from "react";
import assets from "../assets/assets";
import {Eye, EyeOff} from "lucide-react";
import {useNavigate} from "react-router-dom";
const initialFormData = {fullName: "", email: "", password: ""};

export const LoginPage = () => {
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
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // SHOW AND HIDE THE PASSWORD
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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
                <h2 className="font-medium text-2xl flex justify-between items-center">Login</h2>

                {!isDataSubmitted && (
                    <>
                       
                        {/* EMAIL */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="focus:outline-none  p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        ></input>
                        {/* PASSWORD */}
                        <div className="relative    flex items-center gap-2 p-2 border border-gray-500 rounded-md focus-within:ring-2 focus-within:ring-indigo-500  ">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className=" focus:outline-none "
                                required
                            ></input>
                            {showPassword ? (
                                <EyeOff onClick={() => handleShowPassword()}></EyeOff>
                            ) : (
                                <Eye onClick={() => handleShowPassword()} />
                            )}
                        </div>
                    </>
                )}

                {/* WHEN THE USER THE SUBMIT THE CREDENTIAL THEN THEY SHOULD TYPE THEIR BIO */}
                {isDataSubmitted && (
                    <textarea
                        rows={4}
                        placeholder="Provide a short bio"
                        className="p-2 border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    ></textarea>
                )}

                {/* BUTTON */}
                <button
                    type="submit"
                    className="py-3 font-medium bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer text-sm rounded-md"
                >
                    Login Now
                </button>

                <div>
                    <p className="text-gray-500 text-sm">Agree to the terms of use & privacy policy.</p>
                    <div className="flex gap-1 py-3 items-center">
                        <p className="text-gray-500 text-sm">Create  an account </p>
                        <button className="cursor-pointer text-violet-600">
                            <span onClick={()=>navigate("/signup")}>Click here</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
