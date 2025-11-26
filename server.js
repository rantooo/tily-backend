const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes de base
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mp', require('./routes/mp'));
app.use('/api/bz', require('./routes/bz'));
app.use('/api/fivondronana', require('./routes/fivondronana'));

// Health check endpoint pour Render
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Tily Backend MongoDB is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur Tily Analamanga Afovoany API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      mp: '/api/mp', 
      bz: '/api/bz',
      fivondronana: '/api/fivondronana',
      health: '/api/health'
    }
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'production' ? {} : error.message
  });
});

// Connexion MongoDB avec gestion d'erreurs améliorée
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI non définie dans les variables d\'environnement');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connecté à MongoDB avec succès');
  console.log('📊 Base de données:', mongoose.connection.name);
})
.catch((error) => {
  console.error('❌ Erreur de connexion MongoDB:', error);
  process.exit(1);
});

// Gestion de la déconnexion propre
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('👋 Connexion MongoDB fermée');
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📚 API disponible sur: http://localhost:${PORT}`);
});
