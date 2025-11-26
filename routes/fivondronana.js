const express = require('express');
const Fivondronana = require('../models/Fivondronana');

const router = express.Router();

// GET /api/fivondronana
router.get('/', async (req, res) => {
  try {
    const fivondronana = await Fivondronana.find();
    res.json({
      success: true,
      data: fivondronana,
      count: fivondronana.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des fivondronana'
    });
  }
});

module.exports = router;
