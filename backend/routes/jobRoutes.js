// jobify-backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyToJob
} = require('../controllers/jobController');

// Public route
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes
router.post('/', authMiddleware, createJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);
router.post('/:id/apply', authMiddleware, applyToJob);

module.exports = router;
