import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "../ui/toast";
import Api from "@/api/axios";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantTable = () => {

    const { applicants } = useSelector(store => store.application)
    // console.log(applicants);

    const statusHandler = async (status, id) => {
        try {
            const res = await Api.put(`/application/update/${id}`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast.add({
                    title: res.data.message,
                    type: "success"
                })
            }
        } catch (error) {
            toast.add({
                title: error.response?.data?.message || "failed to update status",
                type: "error"
            })
        }
    }


    return (
        <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
            <Table>
                <TableCaption className="py-4 text-gray-500">
                    A list of your recent applied job
                </TableCaption>

                <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="px-6 py-4 font-semibold text-gray-700">
                            Full Name
                        </TableHead>

                        <TableHead className="px-6 py-4 font-semibold text-gray-700">
                            Email
                        </TableHead>

                        <TableHead className="px-6 py-4 font-semibold text-gray-700">
                            Contact
                        </TableHead>

                        <TableHead className="px-6 py-4 font-semibold text-gray-700">
                            Resume
                        </TableHead>

                        <TableHead className="px-6 py-4 font-semibold text-gray-700">
                            Date
                        </TableHead>

                        <TableHead className="px-6 py-4 text-right font-semibold text-gray-700">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        applicants && applicants?.application?.map((item) => (

                            <TableRow key={item._id} className="transition-colors hover:bg-gray-50">

                                <TableCell className="px-6 py-4 font-medium text-gray-900">
                                    {item.applicant.fullName}
                                </TableCell>

                                <TableCell className="px-6 py-4 text-gray-600">
                                    {item.applicant.email}
                                </TableCell>

                                <TableCell className="px-6 py-4 text-gray-600">
                                    {item.applicant.phoneNumber}
                                </TableCell>

                                <TableCell className="px-6 py-4">
                                    <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                        {
                                            item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume}>
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a> : <span className="text-black">NA</span>

                                        }
                                    </button>
                                </TableCell>

                                <TableCell className="px-6 py-4 text-gray-600">
                                    {item?.applicant?.createdAt.split("T")[0]}
                                </TableCell>

                                <TableCell className="px-6 py-4 text-right">
                                    <Popover>
                                        <PopoverTrigger className="rounded-md p-2 transition-colors hover:bg-gray-100">
                                            <MoreHorizontal className="h-5 w-5 text-gray-600" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-36 p-2">
                                            <div onClick={() => statusHandler()} className="flex flex-col gap-1">
                                                {shortListingStatus.map((status, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${status === "Accepted"
                                                            ? "text-green-600 hover:bg-green-50"
                                                            : "text-red-600 hover:bg-red-50"
                                                            }`}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantTable;