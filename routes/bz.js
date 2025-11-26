const express = require('express');
const Beazina = require('../models/Beazina');

const router = express.Router();

// GET /api/bz
router.get('/', async (req, res) => {
  try {
    const bzList = await Beazina.find().limit(10);
    res.json({
      success: true,
      data: bzList,
      count: bzList.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des BZ'
    });
  }
});

// POST /api/bz
router.post('/', async (req, res) => {
  try {
    const bz = new Beazina(req.body);
    await bz.save();
    res.status(201).json({
      success: true,
      data: bz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du BZ'
    });
  }
});

module.exports = router;
