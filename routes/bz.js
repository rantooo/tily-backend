const express = require('express');
const router = express.Router();
const UserBz = require('../models/UserBz');

// Ajouter une fiche BZ
router.post('/', async (req, res) => {
  try {
    const newBz = new UserBz(req.body);
    const savedBz = await newBz.save();
    res.json({ success: true, data: savedBz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Récupérer toutes les fiches BZ
router.get('/', async (req, res) => {
  try {
    const fiches = await UserBz.find();
    res.json({ success: true, data: fiches, count: fiches.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
