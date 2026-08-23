import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Api from '@/api/axios'
import { setUser } from '@/redux/authSlice'
import { toast } from './ui/toast'

const UpdateProfileDialog = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null
    });

    const eventChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const dispatch = useDispatch()
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)

        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true)
            const res = await Api.put("/user/profile/update", formData, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.updateUser))
                toast.add({
                    title: res.data.message,
                    type: "success"
                })
            }
            setOpen(false)
        } catch (error) {
            console.log(error.message);
            toast.add({
                title: error.response?.data?.message || "failed to update",
                type: "error"
            })
            
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="grid gap-2">

                            <div>
                                <label htmlFor="name" className="text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name='fullName'
                                    value={input.fullName}
                                    onChange={eventChangeHandler}
                                    className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name='email'
                                    value={input.email}
                                    onChange={eventChangeHandler}
                                    className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="number" className="text-sm font-medium">
                                    Number
                                </label>
                                <input
                                    id="number"
                                    type="text"
                                    name='phoneNumber'
                                    value={input.phoneNumber}
                                    onChange={eventChangeHandler}
                                    className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="bio" className="text-sm font-medium">
                                    Bio
                                </label>
                                <input
                                    id="bio"
                                    type="text"
                                    name='bio'
                                    value={input.bio}
                                    onChange={eventChangeHandler}
                                    className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="skills" className="text-sm font-medium">
                                    Skills
                                </label>
                                <input
                                    id="skills"
                                    type="text"
                                    name='skills'
                                    value={input.skills}
                                    onChange={eventChangeHandler}
                                    className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="file" className="text-sm font-medium">
                                    Resume (PDF)
                                </label>
                                <input
                                    id="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>

                        </div>

                        <DialogFooter>
                            {loading ? (
                                <Button disabled className="w-full">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    Update Profile
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
