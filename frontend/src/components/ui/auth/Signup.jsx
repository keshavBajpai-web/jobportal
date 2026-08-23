import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import Api from "@/api/axios";
import { toast } from "../toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../button";
import { Loader2 } from "lucide-react";

const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const navigate = useNavigate()
    const {loading,user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0]
        })
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await Api.post("/user/register", formData, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.add({
                    title: res.data.message,
                    type: "success"
                })
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            toast.add({
                title: error.response?.data?.message || "Signup failed",
                type: "error"
            })
        }finally{
           dispatch(setLoading(false))
        }

    }



  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md my-3 p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

                <form
                    onSubmit={submitHandler}
                    className="space-y-3">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block mb-2 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={input.fullName}
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 font-medium">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block mb-2 font-medium">Role</label>

                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                Student
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                Recruiter
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Profile</label>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="border px-2 cursor-pointer"
                        />
                    </div>
                    {/* Signup Button */}
                    {
                        loading ? <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 
                            transition"
                        >
                            Sign Up
                        </button>
                    }

                </form>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to={"/login"}>
                        <span className="text-blue-600 cursor-pointer hover:underline">
                            Login
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;