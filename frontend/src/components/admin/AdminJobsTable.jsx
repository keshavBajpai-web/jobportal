import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AdminJobsTable = () => {

  const navigate = useNavigate()

  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  // console.log(filterJobs);

  // console.log(companies);


  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true
      };
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    });
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])



  return (
    <div className="w-full bg-white rounded-lg border">
      <Table>
        <TableCaption className="text-gray-500 py-4">
          A list of your recent posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Company Name</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            filterJobs?.length <= 0 ? <span>you haven't registered any company yet</span> : (
              <>
                {
                  filterJobs?.map((job) => (


                    <TableRow key={job?._id} className="hover:bg-gray-50">
                      <TableCell>
                        {job?.company?.name}
                      </TableCell>

                      <TableCell className="font-medium">
                        {job?.title}
                      </TableCell>

                      <TableCell className="text-gray-500">
                        {job.createdAt.split("T")[0]}
                      </TableCell>

                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger
                            type="button">
                            <MoreHorizontal className="h-5 w-5" />
                          </PopoverTrigger>

                          <PopoverContent className="w-32 p-2 mr-19">
                            <div onClick={() => navigate(`/admin/editJob/${job._id}`)} className="flex items-center gap-2 p-1 rounded-md cursor-pointer hover:bg-gray-100">

                              <Edit2 className="h-4 w-4" />
                              <span className="text-sm">Edit</span>
                            </div>
                            <div onClick={() => navigate(`/admin/jobs/${job._id}/application`)} className="flex items-center gap-1  rounded-md cursor-pointer hover:bg-gray-100">
                              <Eye className="h-4" />
                              <span className="text-sm">Application</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>

                  ))
                }
              </>
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};
export default AdminJobsTable;

