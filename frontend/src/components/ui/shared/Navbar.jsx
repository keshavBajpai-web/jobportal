import React from "react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Api from "@/api/axios";
import { toast } from "../toast";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await Api.get("/user/logout", {
        withCredentials: true,
      });

      if (res?.data?.success) {
        console.log("loging out");
        dispatch(setUser(null));
        navigate("/");

        toast.add({
          title: res.data.message,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);

      toast.add({
        title: error.response?.data?.message || "failed to logout",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Logo */}
        <div className="shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold">
            Job <span className="text-[#f82002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 md:gap-8">

          {/* Navigation */}
          <ul className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base">

            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>

                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>

                <li>
                  <Link to="/Browse">Browse</Link>
                </li>
              </>
            )}

          </ul>

          {/* Auth */}
          {!user ? (
            <div className="flex gap-2 sm:gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:h-10 sm:px-4"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-[#6a38c2] hover:bg-[#4703bd] sm:h-10 sm:px-4"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer h-9 w-9 sm:h-10 sm:w-10">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-[calc(100vw-2rem)] sm:w-80">
                <div className="flex gap-4 items-center">
                  <Avatar className="cursor-pointer shrink-0">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>

                  <div className="min-w-0">
                    <h4 className="font-medium truncate">
                      {user?.fullName}
                    </h4>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-gray-500 mt-4">

                  {user && user.role === "student" && (
                    <div className="flex gap-3 items-center">
                      <User2 size={20} />

                      <Button variant="link" className="p-0">
                        <Link to="/profile">View profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex gap-3 items-center">
                    <LogOut size={20} />

                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="p-0"
                    >
                      Logout
                    </Button>
                  </div>

                </div>
              </PopoverContent>
            </Popover>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;