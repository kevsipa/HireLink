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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      {jobs.map(job => (
        <div
          key={job._id}
          className="bg-white shadow p-4 mb-4 rounded hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-700">
            {job.company} - {job.location}
          </p>
          <Link
            to={`/jobs/${job._id}`}
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
