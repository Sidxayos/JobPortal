import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);
  const { id } = params; 

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`https://jobportal-2ptm.onrender.com/api/v1/application/${id}/applicants`);
        dispatch(setAllApplicants(res.data.applicants)); 
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchAllApplicants();
  }, [id, dispatch]); 

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>
          Applicants {applicants?.length || 0} 
        </h1>
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
};

export default Applicants;
