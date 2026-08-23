import Api from '@/api/axios'
import { setCompanies} from '@/redux/companySlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllcompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await Api.get(`/company/get`, {
                    withCredentials: true
                })
                if (res?.data?.success) {
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchCompanies()
    }, [])
}

export default useGetAllcompanies