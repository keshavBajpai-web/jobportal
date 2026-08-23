import Api from '@/api/axios'
import { setAllJobs } from '@/redux/jobSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const usegetAllJobs = () => {
  const dispatch = useDispatch()
  const {searchedQuery} = useSelector(store=>store.job)
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await Api.get(`/job/getAllJobs?keyword=${searchedQuery}`, {
          withCredentials: true
        })
        if (res?.data?.success) {
          dispatch(setAllJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error);

      }
    }
    fetchAllJobs()
  }, [searchedQuery,dispatch])
}

export default usegetAllJobs