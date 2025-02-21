// Hirelink-backend/controllers/externalJobController.js
const axios = require('axios');

exports.getExternalJobs = async (req, res) => {
  try {
    // Fetch remote jobs from Remotive
    const response = await axios.get('https://remotive.com/api/remote-jobs');
    const jobs = response.data.jobs; // Remotive returns an object with a "jobs" array
    return res.json(jobs);
  } catch (error) {
    console.error('Error fetching external jobs:', error.message);
    return res.status(500).json({ error: 'Failed to fetch external jobs' });
  }
};
