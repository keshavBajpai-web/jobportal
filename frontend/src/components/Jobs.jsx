import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-18 py-4 sm:py-6 lg:py-8">

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">

        {/* Filter */}
        <div className="lg:col-span-1 w-full min-w-0">
          <FilterCard />
        </div>

        {/* Jobs */}
        <div className="lg:col-span-4 min-w-0 h-auto lg:h-[110vh] py-1 overflow-visible lg:overflow-y-auto lg:pr-2">

          {filterJobs.length <= 0 ? (
            <div className="flex items-center justify-center min-h-[300px] border rounded-lg">
              <span className="text-gray-500 text-base sm:text-lg">
                Job not found
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 place-items-stretch">

              {filterJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job?._id}
                  className="w-full min-w-0"
                >
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