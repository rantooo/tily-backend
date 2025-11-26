const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware de base
app.use(cors());
app.use(express.json());

// Import des routes avec gestion d'erreur
let authRoutes, mpRoutes, bzRoutes, fivondronanaRoutes;

try {
  authRoutes = require('./routes/auth');
  mpRoutes = require('./routes/mp');
  bzRoutes = require('./routes/bz');
  fivondronanaRoutes = require('./routes/fivondronana');
  
  console.log('✅ Toutes les routes chargées avec succès');
} catch (error) {
  console.error('❌ Erreur lors du chargement des routes:', error.message);
  process.exit(1);
}

// Utilisation des routes avec vérification
app.use('/api/auth', authRoutes);
app.use('/api/mp', mpRoutes);
app.use('/api/bz', bzRoutes);
app.use('/api/fivondronana', fivondronanaRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Tily Backend fonctionne!',
    timestamp: new Date().toISOString(),
    routes: ['/api/auth', '/api/mp', '/api/bz', '/api/fivondronana']
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'API Tily Analamanga Afovoany',
    version: '1.0.0',
    status: 'active'
  });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
  console.error('Erreur globale:', error);
  res.status(500).json({
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'production' ? {} : error.message
  });
});

// Connexion MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tily_analamanga';

console.log('🔗 Tentative de connexion à MongoDB...');
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB avec succès');
  })
  .catch((error) => {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    console.log('⚠️  Le serveur continue sans MongoDB');
  });

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌍 Health check: http://localhost:${PORT}/api/health`);
});
