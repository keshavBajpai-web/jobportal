import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatesJobs from './LatesJobs'
import Footer from './ui/shared/Footer'
import usegetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import Companies from './admin/Companies'
import { useNavigate } from 'react-router'

const Home = () => {
  usegetAllJobs()
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(() => {
      if (user?.role === "recruiter") {
        navigate("/admin/companies")
      }
    }, [])
    
  return (
    <>
    <HeroSection/>
    <CategoryCarousel/>
    <LatesJobs/>
    <Footer/>
    </>
  )
}

export default Home
