import Api from '@/api/axios'
import { setAllAdminJobs} from '@/redux/jobSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await Api.get("/job/getAdminJobs", {
          withCredentials: true
        })
        // console.log(res?.data?.jobs);
        
        if (res?.data?.success) {
          dispatch(setAllAdminJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error);

      }
    }
    fetchAllAdminJobs()
  }, [])
}

export default useGetAllAdminJobs