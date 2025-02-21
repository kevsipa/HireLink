// Hirelink-backend/routes/externalJobRoutes.js
const express = require('express');
const router = express.Router();
const { createJobsFromRemote } = require('../controllers/externalJobController');

// Create jobs from the remote API
router.post('/create', createJobsFromRemote);

module.exports = router;
