const express = require('express');
const Mpiandraikitra = require('../models/Mpiandraikitra');

const router = express.Router();

// GET /api/mp
router.get('/', async (req, res) => {
  try {
    const mpList = await Mpiandraikitra.find().limit(10);
    res.json({
      success: true,
      data: mpList,
      count: mpList.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des MP'
    });
  }
});

// POST /api/mp
router.post('/', async (req, res) => {
  try {
    const mp = new Mpiandraikitra(req.body);
    await mp.save();
    res.status(201).json({
      success: true,
      data: mp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du MP'
    });
  }
});

module.exports = router;
