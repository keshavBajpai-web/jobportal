import { Button } from "@base-ui/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Api from "@/api/axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "../ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanySetup = () => {


    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });

    const dispatch = useDispatch()

    const { singleCompany } = useSelector(store => store.company)
    // console.log(singleCompany);

    const [loading, setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    };

    const params = useParams()
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("companyName", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await Api.put(`/company/update/${params.id}`, formData, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.add({
                    title: res.data.message,
                    type: "success",
                });
            }
            navigate("/admin/companies")
        } catch (error) {
            console.log(error);
            toast.add({
                title: error.response?.data?.message || "failed to update",
                type: "error",
            })

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const getCompany = async () => {
            try {
                const res = await Api.get(`/company/get/${params.id}`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };

        getCompany();
    }, [params.id, dispatch]);

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                location: singleCompany.location || "",
                website: singleCompany.website || "",
                file: null
            });
        }
    }, [singleCompany]);
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                <form
                    onSubmit={submitHandler}
                    action="">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            type="button"
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                        </Button>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Company Setup
                        </h1>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Company Name
                            </Label>

                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                                className="h-11"
                            />
                        </div>

                        {/* Website */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Website
                            </Label>

                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://example.com"
                                className="h-11"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Description
                            </Label>

                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Describe your company"
                                className="h-11"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Location
                            </Label>

                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Noida, Uttar Pradesh"
                                className="h-11"
                            />
                        </div>

                        {/* Logo */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Company Logo
                            </Label>

                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="h-11 cursor-pointer pt-2"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end mt-8 pt-6 border-t">
                        {
                            loading ? <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Update
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;