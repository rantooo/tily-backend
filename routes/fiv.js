const express = require('express');
const Fivondronana = require('../models/Fivondronana');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all fivondronana
router.get('/', auth, async (req, res) => {
  try {
    const fivondronana = await Fivondronana.find({ isActive: true }).sort({ fivondronana_id: 1 });
    res.json(fivondronana);
  } catch (error) {
    console.error('Get fivondronana error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create fivondronana (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    const fivondronana = new Fivondronana(req.body);
    await fivondronana.save();

    res.status(201).json(fivondronana);
  } catch (error) {
    console.error('Create fivondronana error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
