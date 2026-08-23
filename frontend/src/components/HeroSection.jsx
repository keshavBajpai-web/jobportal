import { setSearchedQuery } from "@/redux/jobSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const HeroSection = () => {

    const [query, setQuery] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }


    return (
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
            <span className="inline-block bg-blue-100 text-blue-600 font-semibold px-4 py-1.5 rounded-full 
            text-sm">
                No 1 Job Hunt Website
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                Search, Apply & <br />
                Get Your{" "}
                <span className="text-blue-600">
                    Dream Jobs
                </span>
            </h1>

            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                Find the perfect job opportunity according to your skills and experience.
            </p>

            <div className="mt-5 flex justify-center">
                <div className="flex bg-white shadow-md rounded-full overflow-hidden border w-full max-w-lg">
                    <input
                        type="text"
                        value={query}
                         onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your dream jobs"
                        className="flex-1 px-5 py-3 outline-none text-gray-700"
                    />

                    <button onClick={searchJobHandler} className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;