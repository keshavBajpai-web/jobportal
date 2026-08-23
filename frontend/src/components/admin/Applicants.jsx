import React, { useEffect } from "react";
import ApplicantTable from "./ApplicantTable";
import Api from "@/api/axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const {applicants} = useSelector(store=>store.application)
  // console.log(applicants);
  
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await Api.get(`/application/getApplicant/${params.id}`,{
          withCredentials:true
        })
        
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job))
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchApplicants()
  }, [])


  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Applicants
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and review job applicants
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {applicants.application.length} Applicants
        </span>
      </div>

      {/* Applicant Table */}
      <ApplicantTable />
    </div>
  );
};

export default Applicants;