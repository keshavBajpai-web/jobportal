import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllApliedJobs from "@/hooks/useGetAllApliedJobs";

const Profile = () => {
  useGetAllApliedJobs()
  const isResume = true;
  const [open,setOpen] = useState(false)

  const {user} = useSelector(store=>store.auth)
  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white border rounded-xl shadow-sm p-6">

        {/* Profile */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profile.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="text-2xl font-semibold">{user.fullName}</h1>
              <p className="text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <Button
          onClick={()=>setOpen(true)}
          variant="outline" size="icon">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        <hr className="my-6" />

        {/* Contact */}
        <div className="space-y-3 text-sm">
          <div className="flex">
            <span className="w-24 font-medium">Email</span>
            <span className="text-gray-600">{user.email}</span>
          </div>

          <div className="flex">
            <span className="w-24 font-medium">Phone</span>
            <span className="text-gray-600">{user.phoneNumber} </span>
          </div>

          <div className="flex">
            <span className="w-24 font-medium">Location</span>
            <span className="text-gray-600">Noida, India</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="font-semibold mb-3">Skills</h2>

          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm border rounded-full bg-gray-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div> 

        {/* Resume */}
        <div className="mt-6 flex items-center gap-3">
          <span className="font-medium">Resume:</span>

          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>


      </div>
        {/* Applied Jobs */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Applied Jobs
          </h2>

          <AppliedJobTable />
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;