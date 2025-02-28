// jobify-frontend/src/pages/ExternalJobs.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import SyncJobsButton from '../components/SyncJobsButton';

const ExternalJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchExternalJobs = async () => {
      try {
        const res = await axios.get('/api/external-jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching external jobs:', err);
      }
    };
    fetchExternalJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">External Remote Jobs</h2>
      {jobs.length === 0 && <p>No jobs available at this time.</p>}
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white shadow p-4 mb-4 rounded hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-700">{job.company_name}</p>
          <p className="text-gray-600">{job.category}</p>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            Apply Here
          </a>
        </div>
      ))}
    </div>
  );
};

export default ExternalJobs;