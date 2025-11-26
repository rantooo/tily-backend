const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ✅ Route POST /login - CORRIGÉE
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    // Validation des champs requis
    if (!login || !password) {
      return res.status(400).json({ 
        message: 'Login et mot de passe requis' 
      });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ 
        message: 'Utilisateur non trouvé' 
      });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Mot de passe incorrect' 
      });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { 
        userId: user._id, 
        login: user.login, 
        role: user.role,
        fivondronanaId: user.fivondronanaId
      },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );

    // Réponse de succès
    res.json({
      success: true,
      token: token,
      user_id: user._id,
      login: user.login,
      role: user.role,
      fivondronanaId: user.fivondronanaId
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Erreur interne du serveur' 
    });
  }
});

// ✅ Route POST /signup - CORRIGÉE
router.post('/signup', async (req, res) => {
  try {
    const { login, password, fivondronanaId } = req.body;

    // Validation des champs requis
    if (!login || !password || !fivondronanaId) {
      return res.status(400).json({ 
        message: 'Tous les champs sont requis' 
      });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Cet utilisateur existe déjà' 
      });
    }

    // Création du nouvel utilisateur
    const newUser = new User({
      login: login,
      password: password,
      fivondronanaId: parseInt(fivondronanaId),
      role: 'user'
    });

    // Sauvegarde (le mot de passe sera hashé automatiquement par le pre-save)
    await newUser.save();

    // Réponse de succès
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user: {
        id: newUser._id,
        login: newUser.login,
        fivondronanaId: newUser.fivondronanaId,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du compte' 
    });
  }
});

// ✅ Route POST /logout - CORRIGÉE
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Déconnexion réussie'
  });
});

// ✅ Route GET /me - CORRIGÉE (pour test)
router.get('/me', (req, res) => {
  res.json({
    message: 'Endpoint me - à implémenter avec auth middleware'
  });
});

module.exports = router;
