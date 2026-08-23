import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Api from "@/api/axios";
import { toast } from "../ui/toast";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";


const companyArray = []

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector(store => store.company)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
    setInput({ ...input, companyId: selectedCompany._id })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const res = await Api.post("/job/post", input, {
        withCredentials: true
      })
      if (res.data.success) {
        toast.add({
          title: res.data.message,
          type: "success"
        })
        navigate("/admin/jobs")
      }

    } catch (error) {
      console.log(error);
      toast.add({
        title: error?.response?.data.message,
        type: "error"
      })

    } finally {
      setLoading(false)
    }

  }


  return (
    <>
      <div>
        <div>
          <h1 className="text-center text-2xl font-bold">Post  <span className="text-red-500">Job</span></h1>

          <form
            onSubmit={submitHandler}
            className="max-w-3xl mx-auto mt-8 p-6 border rounded-lg shadow-sm space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  placeholder="Enter job title"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Salary</Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  placeholder="e.g. 5-8 LPA"
                  className="h-11"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter job description"
                  className="h-11"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="e.g. Noida"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  placeholder="Full Time"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Input
                  type="text"
                  name="experienceLevel"
                  value={input.experienceLevel}
                  onChange={changeEventHandler}
                  placeholder="e.g. 0-2 Years"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>No. of Position</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  min="1"
                  className="h-11"
                />
              </div>

              {
                companies.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Label>Select Company</Label>

                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="h-11 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {companies.map((company) => {
                            return (
                              <SelectItem
                                key={company._id}
                                value={company?.name?.toLowerCase()}
                                className="cursor-pointer"
                              >
                                {company.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )
              }

            </div>

            {
              loading ? <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Post a Job
              </button>
            }

            {
              companies.length === 0 && <p className="text-red-500 text-sm text-center">*Please register a company first, before posting jobs</p>
            }

          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;