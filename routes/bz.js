const express = require('express');
const Beazina = require('../models/Beazina');
const { auth, mpAuth } = require('../middleware/auth');

const router = express.Router();

// Get all BZ with filters
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
        { karatra: { $regex: search, $options: 'i' } }
      ];
    }

    const bzList = await Beazina.find(filter).sort({ createdAt: -1 });
    res.json(bzList);

  } catch (error) {
    console.error('Get BZ error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single BZ
router.get('/:id', auth, async (req, res) => {
  try {
    const bz = await Beazina.findById(req.params.id);
    
    if (!bz) {
      return res.status(404).json({ message: 'BZ not found' });
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && bz.addedBy !== req.user.login) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(bz);

  } catch (error) {
    console.error('Get BZ by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create BZ
router.post('/', mpAuth, async (req, res) => {
  try {
    const bzData = {
      ...req.body,
      addedBy: req.user.login
    };

    // Validation de la date de naissance
    if (!bzData.datynahaterahana) {
      return res.status(400).json({ message: 'Date de naissance est requise' });
    }

    const bz = new Beazina(bzData);
    await bz.save();

    res.status(201).json(bz);

  } catch (error) {
    console.error('Create BZ error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update BZ
router.put('/:id', mpAuth, async (req, res) => {
  try {
    const bz = await Beazina.findById(req.params.id);
    
    if (!bz) {
      return res.status(404).json({ message: 'BZ not found' });
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && bz.addedBy !== req.user.login) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedBz = await Beazina.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedBz);

  } catch (error) {
    console.error('Update BZ error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete BZ
router.delete('/:id', mpAuth, async (req, res) => {
  try {
    const bz = await Beazina.findById(req.params.id);
    
    if (!bz) {
      return res.status(404).json({ message: 'BZ not found' });
    }

    // Vérifier les permissions
    if (req.user.role !== 'admin' && bz.addedBy !== req.user.login) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Beazina.findByIdAndDelete(req.params.id);
    res.json({ message: 'BZ deleted successfully' });

  } catch (error) {
    console.error('Delete BZ error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
