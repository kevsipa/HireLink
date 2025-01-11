// jobify-frontend/src/pages/Jobs.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.map(job => (
        <div key={job._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <Link to={`/jobs/${job._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
