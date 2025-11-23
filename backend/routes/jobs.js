const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const getJob = require('../models/Job');
const getAppliedJob = require('../models/AppliedJob');
const auth = require('../middleware/auth');

// ------------------ GET ALL JOBS ------------------
router.get('/', async (req, res) => {
  const q = req.query.q || '';
  try {
    const Job = getJob();
    const where = q ? {
      [Op.or]: [
        { title: { [Op.iLike]: `%${q}%` } }
      ]
    } : {};
    
    const jobs = await Job.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------ GET ONE JOB ------------------
router.get('/:id', async (req, res) => {
  try {
    const Job = getJob();
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------ CREATE JOB (Protected) ------------------
router.post('/', auth, async (req, res) => {
  try {
    const Job = getJob();
    const { title, applyLink } = req.body;

    if (!title?.trim()) return res.status(400).json({ message: 'Title is required' });
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });

    const job = await Job.create({
      title: title.trim(),
      applyLink: applyLink?.trim() || '',
      createdBy: req.user.id
    });

    res.status(201).json(job);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------ UPDATE JOB (Protected) ------------------
router.put('/:id', auth, async (req, res) => {
  try {
    const Job = getJob();
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    await job.update(req.body);
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------ DELETE JOB (Protected) ------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const Job = getJob();
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    await job.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ------------------ GET ALL APPLIED JOBS (Protected) ------------------
router.get('/appliedJobs', auth, async (req, res) => {
  try {
    const AppliedJob = getAppliedJob();
    const apps = await AppliedJob.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
