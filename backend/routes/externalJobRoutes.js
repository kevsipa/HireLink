// Hirelink-backend/routes/externalJobRoutes.js
const express = require('express');
const router = express.Router();
const { getExternalJobs } = require('../controllers/externalJobController');

// Route: GET /api/external-jobs
router.get('/', getExternalJobs);

module.exports = router;
