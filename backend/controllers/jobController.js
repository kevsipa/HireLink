// jobify-backend/controllers/jobController.js
const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location } = req.body;
    if (!title || !description || !company || !location) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newJob = new Job({
      title,
      description,
      company,
      location,
      postedBy: req.userId, // from authMiddleware
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'username email');
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'username email');
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { title, description, company, location } = req.body;
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if the user is the one who posted the job
    if (job.postedBy.toString() !== req.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.company = company || job.company;
    job.location = location || job.location;

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await job.remove();
    res.status(200).json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Avoid duplicate applications
    if (job.applicants.includes(req.userId)) {
      return res.status(400).json({ msg: 'You have already applied for this job' });
    }

    job.applicants.push(req.userId);
    await job.save();

    res.status(200).json({ msg: 'Application successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};