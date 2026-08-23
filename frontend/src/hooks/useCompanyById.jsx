import Api from '@/api/axios'
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await Api.get(`/company/get/${companyId}`, {
                    withCredentials: true
                })
                if (res?.data?.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchCompanyById()
    }, [companyId,dispatch])
}

export default useCompanyById