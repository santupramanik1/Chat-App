import { Loader2, MoveRight } from 'lucide-react'

import assets from "../assets/assets";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {

    const [email, setEmail] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const nevigateTo = useNavigate()

    const handleFormSubmit = async (e: React.FormEvent<HTMLElement>): Promise<void> => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await axios.post(`http://localhost:4000/api/v1/login`, { email })

            // alert(data.message)
            nevigateTo(`/verify?email=${email}`)

        } catch (error: any) {

            alert(error.response?.data?.message || "Something went wrong")
        }
        finally {
            setLoading(false)
        }

        setEmail("")
    }

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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="focus:outline-none  p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        ></input>
                    </div>
                </>


                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="py-3 font-medium bg-gradient-to-r from-purple-500 to-violet-600  text-white border-none cursor-pointer text-sm rounded-md flex items-center justify-center gap-2"
                >
                    {
                        loading ?
                            <div className='flex  gap-2'>
                                <Loader2 className='w-5 h-5'></Loader2>
                                Sending otp to your email
                            </div> : <p className='flex  gap-2'>Send Verification Code <MoveRight /></p>
                    }
                </button>

                <div>
                    <p className="text-gray-500 text-sm">Agree to the terms of use & privacy policy.</p>
                </div>
            </form>
        </div>
    )
}
