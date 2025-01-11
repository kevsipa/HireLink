// jobify-frontend/src/pages/JobDetails.js
import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [id]);

  const applyToJob = async () => {
    if (!user) {
      return navigate('/login');
    }
    try {
      await axios.post(`/api/jobs/${id}/apply`);
      alert('Applied successfully');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || 'Error applying');
    }
  };

  if (!job) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>{job.description}</p>
      {user && user.role === 'seeker' && (
        <button onClick={applyToJob}>Apply Now</button>
      )}
    </div>
  );
};

export default JobDetails;
