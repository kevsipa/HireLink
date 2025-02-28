// jobify-frontend/src/pages/ExternalJobs.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

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
    // Automatically fetch jobs on component mount
    fetchExternalJobs();
  }, []); // empty dependency array means this runs once on mount

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Remote Job Opportunities
      </h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available at this time.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-700">{job.company_name}</p>
              <p className="text-gray-600 mb-4">{job.candidate_required_location}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Apply Here
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExternalJobs;