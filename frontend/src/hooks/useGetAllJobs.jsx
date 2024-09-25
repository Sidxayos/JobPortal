import { setAllJobs } from '@/redux/jobSlice';
//import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchText } = useSelector(store => store.job);
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://jobportal-2ptm.onrender.com/api/v1/job/all?keyword=${searchText}`);
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    console.log('Failed to fetch jobs data'); 
                }
            } catch (error) {
                console.log('An error occurred while fetching jobs data:', error);
            }
        };
        fetchAllJobs();
    },[dispatch, searchText]);
};

export default useGetAllJobs
