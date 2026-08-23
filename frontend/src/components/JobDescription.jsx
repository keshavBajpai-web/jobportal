import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router";
import Api from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import {setSingleJob } from "@/redux/jobSlice";
import { toast } from "./ui/toast";

const JobDescription = () => {
  const {id} = useParams()
  const jobId = id
  const dispatch = useDispatch()
  
  const {user} = useSelector(store=>store.auth)
  //  console.log(user);
  const {singleJob} = useSelector(store=>store.job)
  const isInitiallyApplied = singleJob?.application?.some(app=>app.applicant?._id === user?._id)||false;
  
  const [isApplied , setIsApplied] = useState(isInitiallyApplied)
  
  // console.log(isApplied);
  
  // console.log(singleJob);
 
  const applyHandler = async() => {
    try {
      const res = await Api.post(`/application/apply/${id}`,{},{
        withCredentials:true
      })
      if (res.data.success) {
        setIsApplied(true)
        const updateSingleJob = {...singleJob,application:[...singleJob.application,{applicant:user?._id}]}
        dispatch(setSingleJob(updateSingleJob))//for real time update
        toast.add({
          title:res.data.message,
          type:"success"
        })
      }
    } catch (error) {
      console.log(error);
      toast.add({
        title:error.response?.data?.message || "not applied",
        type:"error"
      })
    }
  }
  
 
   useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await Api.get(`/job/get/${jobId}`, {
          withCredentials: true
        })
        // console.log(res?.data);
        
        if (res?.data?.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.application.some(application=>application.applicant?._id === user?._id))
        }
      } catch (error) {
        console.log(error);

      }
    }
    fetchSingleJob()
  }, [jobId,dispatch,user._id])
 
  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-white border rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-3xl font-bold">{singleJob?.title}</h1>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">{singleJob?.position}</Badge>
              <Badge variant="secondary">{singleJob?.jobType}</Badge>
              <Badge variant="secondary">{singleJob?.salary}</Badge>
            </div>
          </div>

          <Button
           onClick={isApplied?null:applyHandler}
            disabled={isApplied}
            className={
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5a0892]"
            }
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <hr className="my-6" />

        {/* Job Description */}
        <h2 className="text-xl font-semibold mb-5">Job Description</h2>

        <div className="space-y-4 text-sm">
          <div>
            <span className="font-semibold">Role:</span>
            <span className="ml-2 text-gray-600">{singleJob?.title}</span>
          </div>

          <div>
            <span className="font-semibold">Location:</span>
            <span className="ml-2 text-gray-600">{singleJob?.location}</span>
          </div>

          <div>
            <span className="font-semibold">Description:</span>
            <span className="ml-2 text-gray-600">
              {singleJob?.description}
            </span>
          </div>

          <div>
            <span className="font-semibold">Experience:</span>
            <span className="ml-2 text-gray-600">{singleJob?.experienceLevel}</span>
          </div>

          <div>
            <span className="font-semibold">Salary:</span>
            <span className="ml-2 text-gray-600">{singleJob?.salary}</span>
          </div>

          <div>
            <span className="font-semibold">Total Applications:</span>
            <span className="ml-2 text-gray-600">{singleJob?.application.length}</span>
          </div>

          <div>
            <span className="font-semibold">Posted Date:</span>
            <span className="ml-2 text-gray-600">{singleJob?.createdAt.split("T")[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;