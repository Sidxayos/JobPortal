import { setAllAdminJobs } from '@/redux/jobSlice';
//import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get('https://jobportal-2ptm.onrender.com/api/v1/job/getadminjobs');
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    console.log('Failed to fetch jobs data'); 
                } 
            } catch (error) {
                console.log('An error occurred while fetching jobs data:', error);
            }
        };
        fetchAllAdminJobs();
    },[dispatch]);
};

export default useGetAllAAdminJobs
