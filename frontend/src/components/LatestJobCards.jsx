import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";

const LatestJobCards = ({job}) => {
  // console.log(job);
  // const companyName = job?.company?.populate("companyName")
  // console.log(companyName);
  const navigate = useNavigate()
  
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      
      <div  className="mb-4">
        <h1 className="font-semibold text-lg">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">
          {job?.location}
        </p>
      </div>

      <div className="mb-5">
        <h1 className="font-bold text-xl">
          {job?.title}
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
          {job?.position}
        </Badge>

        <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
          {job?.jobType}
        </Badge>

        <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">
          {job?.salary} LPA
        </Badge>
      </div>

    </div>
  );
};

export default LatestJobCards;