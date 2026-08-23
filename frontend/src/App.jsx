import React from 'react'
import Navbar from './components/ui/shared/Navbar'

import { RouterProvider, createBrowserRouter, Outlet } from 'react-router'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        // this all routes for client side

        { path: "/", element: <Home /> },

        { path: "/login", element: <Login /> },

        { path: "/signup", element: <Signup /> },                  

        { path: "/jobs", element: <Jobs /> },

        { path: "/browse", element: <Browse /> },

        { path: "/profile", element: <Profile /> },

        { path: "/description/:id", element: <JobDescription /> },

        // this all routes for admin side

        {path:"/admin/companies",element: <ProtectedRoute><Companies/></ProtectedRoute> },

        {path:"/admin/companies/create",element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>},

        {path:"/admin/companies/:id",element:<ProtectedRoute><CompanySetup/></ProtectedRoute>},

        {path:"/admin/jobs",element:<ProtectedRoute><AdminJobs/></ProtectedRoute>},

        {path:"/admin/jobs/post",element:<ProtectedRoute><PostJob/></ProtectedRoute>},
        
        {path:`/admin/jobs/:id/application`,element:<ProtectedRoute><Applicants/></ProtectedRoute>}

      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App 
