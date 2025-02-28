// jobify-backend/controllers/externalJobController.js
const axios = require('axios');
const Job = require('../models/Job');

async function syncExternalJobs(){
  try {
    // Fetch jobs from the Remotive API
    const response = await axios.get('https://remotive.com/api/remote-jobs');
    const remoteJobs = response.data.jobs; // API returns an object with a "jobs" array
    
    const createdJobs = [];
    // const processedIds = new Set();
    
    // Loop through each job from Remotive
    for (const remoteJob of remoteJobs) {
      // // Skip if we've already processed this remoteId in this run
      // if (processedIds.has(remoteJob.id)) continue;
      // processedIds.add(remoteJob.id);
      // Check if the job already exists using the remoteId field
      const existingJob = await Job.findOne({ remoteId: remoteJob.id });
      if (!existingJob) {
        // Map remote job fields to your local Job model fields
        const jobData = {
          title: remoteJob.title,
          description: remoteJob.description || 'No description provided',
          company: remoteJob.company_name,
          location: remoteJob.candidate_required_location,
          remoteId: remoteJob.id,
        };

        const newJob = new Job(jobData);
        const savedJob = await newJob.save();
        createdJobs.push(savedJob);
      }
    }

    return createdJobs;
  } catch (error) {
    throw error;
  }
};

exports.syncExternalJobs = syncExternalJobs;

exports.createJobsFromRemote = async (req, res) => {
  try {
    const createdJobs = await syncExternalJobs();
    return res.status(201).json({
      msg: 'Jobs created from remote API',
      count: createdJobs.length,
      jobs: createdJobs,
    });
  } catch (error) {
    console.error('Error creating jobs from remote API:', error.message);
    return res.status(500).json({ error: 'Failed to create jobs from remote API' });
  }
};
