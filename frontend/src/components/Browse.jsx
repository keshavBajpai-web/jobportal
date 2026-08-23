import React, { useEffect } from "react";
import Job from "./Job";
import {  useSelector } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
import usegetAllJobs from "@/hooks/useGetAllJobs";


const Browse = () => {
  usegetAllJobs()
  const { allJobs } = useSelector(store => store.job)
  // const dispatch = useDispatch()
 


  return (
    <div className="bg-gray-50 min-h-screen  py-10">
      <div className="max-w-7xl mx-auto px-16">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Search Results
          <span className="text-purple-600"> ({allJobs.length})</span>
        </h1>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Browse;