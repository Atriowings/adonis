const { Op } = require('sequelize');
const getAppliedJob = require("../models/AppliedJob");

// Get all jobs with optional search
exports.getJobs = async (req, res) => {
  const q = req.query.q || '';
  try {
    const AppliedJob = getAppliedJob();
    const where = q ? {
      [Op.or]: [
        { name: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } },
        { mobile: { [Op.iLike]: `%${q}%` } },
        { message: { [Op.iLike]: `%${q}%` } }
      ]
    } : {};

    const jobs = await AppliedJob.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get single job by ID
exports.getJobById = async (req, res) => {
  try {
    const AppliedJob = getAppliedJob();
    const job = await AppliedJob.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error('Error fetching job:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create new job with validation
exports.createJob = async (req, res) => {
  try {
    const AppliedJob = getAppliedJob();
    const { name, email, mobile, message } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token or user not found' });
    }

    const job = await AppliedJob.create({
      name: name.trim(),
      email: email.trim(),
      mobile: mobile?.trim() || '',
      message: message?.trim() || ''
    });

    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const AppliedJob = getAppliedJob();
    const job = await AppliedJob.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.update(req.body);
    res.json(job);
  } catch (err) {
    console.error('Error updating job:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const AppliedJob = getAppliedJob();
    const job = await AppliedJob.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    await job.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
