import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router";

const Job = ({ job }) => {
  // console.log("job",job);
  const navigate = useNavigate()

  // const jobId ="kjashdfk"

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }


  return (
    <div className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* Top */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500"> {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-100"
        >
          <Bookmark className="w-5 h-5" />
        </Button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={job?.company?.logo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-semibold text-lg"> {job?.company?.name} </h2>
          <p className="text-sm text-gray-500">Bangalore, India</p>
        </div>
      </div>

      {/* Job */}
      <div className="mt-5">
        <h1 className="text-xl font-bold">
          {job?.title}
        </h1>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-5">
        <Badge variant="secondary">{job?.position} position</Badge>
        <Badge variant="secondary">{job?.jobType}</Badge>
        <Badge variant="secondary"> {job?.salary}</Badge>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-6">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="flex-1">
          Details
        </Button>

        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          save for later
        </Button>
      </div>
    </div>
  );
};

export default Job;