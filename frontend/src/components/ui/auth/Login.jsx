import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "../toast";
import Api from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Button } from "../button";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });


  const { loading , user} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await Api.post("/user/login", form, {
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.add({
          title: res.data.message,
          type: "success"
        })
        navigate("/")
      }
    } catch (error) {
      console.log(error.response);
      console.log(error?.response?.data);

      toast.add({
        title: error.response?.data?.message || "login failed",
        type: "error"
      })
    } finally {
      dispatch(setLoading(false))
    }

  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg my-4">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form
          onSubmit={submitHandler}
          className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 font-medium">Role</label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={form?.role === "student"}
                  onChange={changeEventHandler}
                />
                Student
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={form?.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* Login Button */}
          {
            loading ? <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          }

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-600 hover:underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;