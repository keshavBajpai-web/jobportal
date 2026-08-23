import { Input } from "@base-ui/react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router";
import useGetAllcompanies from "@/hooks/useGetAllcompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllcompanies()
  const [input, setInput] = useState("");
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(setSearchCompanyByText(input))
  }, [input])


  const navigate = useNavigate()
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Input
          placeholder="Filter by name"
          className="w-full sm:w-72 h-10 border border-gray-300 rounded-md px-3 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setInput(e.target.value)}
        />

        <Button onClick={() => navigate("/admin/companies/create")} className="w-full sm:w-auto">
          New Company
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;