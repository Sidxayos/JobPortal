import { setSingleCompany } from '@/redux/companySlice';
//import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const UseGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://jobportal-2ptm.onrender.com/api/v1/company/getcompany/${companyId}`);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                } else {
                    console.log('Failed to fetch jobs data'); 
                }
            } catch (error) {
                console.log('An error occurred while fetching jobs data:', error);
            }
        };
        fetchSingleCompany();
    },[companyId,dispatch]);
};

export default UseGetCompanyById
