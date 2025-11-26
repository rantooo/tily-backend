const express = require('express');
const Mpiandraikitra = require('../models/Mpiandraikitra');
const { auth, mpAuth } = require('../middleware/auth');

const router = express.Router();

// Get all MP with filters
router.get('/', auth, async (req, res) => {
  try {
    const { addedBy, faritra, sampana, fafiStatus, search } = req.query;
    let filter = {};

    // Si l'utilisateur n'est pas admin, il ne voit que ses données
    if (req.user.role !== 'admin') {
      filter.addedBy = req.user.login;
    } else if (addedBy && addedBy !== 'all') {
      filter.addedBy = addedBy;
    }

    if (faritra && faritra !== 'all') {
      filter.faritra = faritra;
    }

    if (sampana && sampana !== 'all') {
      filter.sampana = sampana;
    }

    if (fafiStatus && fafiStatus !== 'all') {
      filter.fafiStatus = fafiStatus;
    }

    if (search) {
      filter.$or = [
        { anarana: { $regex: search, $options: 'i' } },
        { anaranafanampiny: { $regex: search, $options: 'i' } },
        { totem: { $regex: search, $options: 'i' } },
        { karatra2425: { $regex: search, $options: 'i' } }
      ];
    }

    const mpList = await Mpiandraikitra.find(filter).sort({ createdAt: -1 });
    res.json(mpList);

  } catch (error) {
    console.error('Get MP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single MP
router.get('/:id', auth, async (req, res) => {
  try {
    const mp = await Mpiandraikitra.findById(req.params.id);
    
    if (!mp) {
      return res.status(404).json({ message: 'MP not found' });
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && mp.addedBy !== req.user.login) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(mp);

  } catch (error) {
    console.error('Get MP by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create MP
router.post('/', mpAuth, async (req, res) => {
  try {
    const mpData = {
      ...req.body,
      addedBy: req.user.login
    };

    // Validation de la date de naissance
    if (!mpData.datynahaterahana) {
      return res.status(400).json({ message: 'Date de naissance est requise' });
    }

    const mp = new Mpiandraikitra(mpData);
    await mp.save();

    res.status(201).json(mp);

  } catch (error) {
    console.error('Create MP error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update MP
router.put('/:id', mpAuth, async (req, res) => {
  try {
    const mp = await Mpiandraikitra.findById(req.params.id);
    
    if (!mp) {
      return res.status(404).json({ message: 'MP not found' });
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && mp.addedBy !== req.user.login) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedMp = await Mpiandraikitra.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedMp);

  } catch (error) {
    console.error('Update MP error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete MP
router.delete('/:id', mpAuth, async (req, res) => {
  try {
    const mp = await Mpiandraikitra.findById(req.params.id);
    
    if (!mp) {
      return res.status(404).json({ message: 'MP not found' });
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && mp.addedBy !== req.user.login) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Mpiandraikitra.findByIdAndDelete(req.params.id);
    res.json({ message: 'MP deleted successfully' });

  } catch (error) {
    console.error('Delete MP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
