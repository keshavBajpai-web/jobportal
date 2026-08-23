import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)

  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])


  return (
    <div className="max-w-8xl  mx-auto px-18 py-8">
      <div className="grid  grid-cols-1 py-4 lg:grid-cols-5 gap-6">

        {/* Filter */}
        <div className="lg:col-span-1 ">
          <FilterCard />
        </div>

        {/* Jobs */}
        <div className="lg:col-span-4 h-[110vh] py-1 overflow-y-auto pr-2">
          {filterJobs.length <= 0 ? (
            <div className="flex items-center justify-center h-full border rounded-lg">
              <span className="text-gray-500 text-lg">
                Job not found
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center">
              {filterJobs.map((job) => (
                <motion.div 
                initial={{opacity:0,x:100}}
                animate={{opacity:1,x:0}}
                exit={{opacity:0,x:-100}}
                transition={{duration:0.3}}
                key={job?._id}>
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Jobs;