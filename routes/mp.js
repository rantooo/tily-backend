module.exports = router;

const express = require('express');
const router = express.Router();
const UserMp = require('../models/UserMp');

// Ajouter une fiche MP
router.post('/', async (req, res) => {
  try {
    const newMp = new UserMp(req.body);
    const savedMp = await newMp.save();
    res.json({ success: true, data: savedMp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Récupérer toutes les fiches MP
router.get('/', async (req, res) => {
  try {
    const fiches = await UserMp.find();
    res.json({ success: true, data: fiches, count: fiches.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

