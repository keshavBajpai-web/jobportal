import { Input } from "@base-ui/react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState("");
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])


  const navigate = useNavigate()
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Input
          placeholder="Filter by name ,role"
          className="w-full sm:w-72 h-10 border border-gray-300 rounded-md px-3 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setInput(e.target.value)}
        />

        <Button onClick={() => navigate("/admin/jobs/post")} className="w-full sm:w-auto">
          New Job
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;