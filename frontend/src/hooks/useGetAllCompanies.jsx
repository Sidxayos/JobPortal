import { setCompanies } from '@/redux/companySlice';
//import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const UseGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get("https://jobportal-2ptm.onrender.com/api/v1/company/getcompany");
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                } else {
                    console.log('Failed to fetch companies data');
                }
            } catch (error) {
                console.error('An error occurred while fetching companies data:', error);
            }
        };
        fetchCompanies();
    }, [dispatch]);
};

export default UseGetAllCompanies;

