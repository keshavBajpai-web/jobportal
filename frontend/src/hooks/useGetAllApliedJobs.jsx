import Api from '@/api/axios'
import { setAllApliedJobs } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllApliedJobs = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await Api.get("/application/getAppliedJob", { withCredentials: true })
                // console.log(res.data.application);
                
                if (res.data.success) {
                    dispatch(setAllApliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAppliedJobs()

    }, [])

}

export default useGetAllApliedJobs