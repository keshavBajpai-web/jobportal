import React from 'react'
import { Link, useNavigate } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Api from '@/api/axios'
import { toast } from '../toast'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(store => store.auth)

  const logoutHandler = async () => {

    try {
      const res = await Api.get("/user/logout", {
        withCredentials: true
      })
      if (res?.data?.success) {
        console.log("loging out");
        dispatch(setUser(null))
        navigate("/")
        toast.add({
          title: res.data.message,
          type: "success"
        })
      }

    } catch (error) {
      console.log(error);
      toast.add({
        title: error.response?.data?.message || " failed to logout",
        type: "error"
      })

    }
  }


  return (
    <div className='bg-white'>
      <div className='flex justify-between items-center mx-auto max-w-7xl h-16 px-16'>
        <div>
          <h1 className='text-2xl font-bold'>Job <span className='text-[#f82002]' >Portal</span></h1>
        </div>
        <div className='flex items-center gap-8'>
          <ul className='flex items-center gap-5'>

            {
              user && user.role === "recruiter" ? (
                <>
                  <li><Link to={"/admin/companies"}>Companies</Link></li>
                  <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                </>
              ) :
                (
                  <>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/jobs"}>Jobs</Link></li>
                    <li><Link to={"/Browse"}>Browse</Link></li>
                  </>
                )
            }

          </ul>

          {
            !user ? (
              <div className='flex gap-4'>
                <Link to={"/login"}>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to={"/signup"}>
                  <Button className="bg-[#6a38c2] hover:bg-[#4703bd]">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className={"w-80"}>
                  <div className='flex gap-4 items-center'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>{user?.fullName}</h4>
                      <p className='text-sm text-muted-foreground'> {user?.profile?.bio} </p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-3 text-gray-500'>

                    {
                      user && user.role === "student" && (
                        <div className='flex gap-3'>
                          <User2 />
                          <Button variant="link" > <Link to={"/profile"}>view profile</Link> </Button>
                        </div>
                      )
                    }


                    <div className='flex gap-3'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link" >Logout</Button>
                    </div>

                  </div>

                </PopoverContent>
              </Popover>
            )
          }


        </div>
      </div>
    </div>
  )
}

export default Navbar
