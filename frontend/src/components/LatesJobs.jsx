import React, { useEffect } from "react";
import LatestJobCards from "./LatestJobCards";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const LatesJobs = () => {
  const { allJobs } = useSelector(store => store.job)
  // console.log(allJobs);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchedQuery(""))
  }, [dispatch])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        <span className="text-blue-600">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          allJobs.length <= 0 ? <span>no jobs</span> : allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        }
      </div>
    </div>
  );
};

export default LatesJobs;