const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const getSetting = require('../models/Setting');
const auth = require('../middleware/auth');

// GET /api/settings/:key
router.get('/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const Setting = getSetting();
    const s = await Setting.findOne({ where: { key } });
    res.json(s ? s.value : null);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/settings/:key (protected)
router.post('/:key', auth, async (req, res) => {
  const key = req.params.key;
  const { value } = req.body;
  try {
    const Setting = getSetting();
    const [s, created] = await Setting.findOrCreate({
      where: { key },
      defaults: { value }
    });
    
    if (!created) {
      s.value = value;
      await s.save();
    }
    
    res.json(s);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
