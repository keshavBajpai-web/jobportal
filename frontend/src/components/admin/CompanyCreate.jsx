import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import Api from "@/api/axios";
import { toast } from "../ui/toast";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await Api.post(
        "/company/register",
        { companyName },
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));

        const companyId = res?.data?.company?._id;

        toast.add({
          title: res.data.message,
          type: "success",
        });

        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.add({
        title: error.response?.data?.message || "Company creation failed",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border rounded-xl shadow-sm p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Your Company Name
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Create your company profile to start posting jobs and managing
            applications.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <Label
            htmlFor="companyName"
            className="text-sm font-medium text-gray-700"
          >
            Company Name
          </Label>

          <Input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="JobHunt, Microsoft, Google etc."
            className="h-11"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>

          <Button
            onClick={registerNewCompany}
            disabled={!companyName.trim()}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;