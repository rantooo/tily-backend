const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: 'Login and password required' });
    }

    const user = await User.findOne({ login, isActive: true });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        login: user.login,
        role: user.role,
        fivondronanaId: user.fivondronanaId
      },
      process.env.JWT_SECRET || 'tily_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user_id: user._id,
      login: user.login,
      role: user.role,
      fivondronanaId: user.fivondronanaId
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { login, password, fivondronanaId } = req.body;

    if (!login || !password || !fivondronanaId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      login,
      password,
      fivondronanaId: parseInt(fivondronanaId),
      role: 'user'
    });

    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        id: user._id,
        login: user.login,
        fivondronanaId: user.fivondronanaId
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Get current user
router.get('/me', auth, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      login: req.user.login,
      role: req.user.role,
      fivondronanaId: req.user.fivondronanaId
    }
  });
});

module.exports = router;
