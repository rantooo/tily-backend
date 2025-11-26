const mongoose = require('mongoose');

const beazinaSchema = new mongoose.Schema({
  // Informations personnelles
  karatra: String,
  anarana: { type: String, required: true },
  anaranafanampiny: { type: String, required: true },
  totem: String,
  datynahaterahana: { type: Date, required: true },
  anaranaray: String,
  anaranareny: String,
  sampana: { type: String, enum: ['MV', 'MS', 'MN', 'MNF'] },
  
  // Fivondronana
  fivondronana_id: Number,
  fiangonana: String,
  faritra: { type: String, enum: ['A', 'I', 'M', 'O', 'S'] },
  datyfanekena: Date,
  
  // Ambaratonga et talents
  ambaratonga: Number,
  talenta: String,
  
  // FAFI
  fafiStatus: { type: String, enum: ['V', 'P', 'N'], default: 'N' },
  fafiDate: Date,
  fafiAmount: { type: Number, default: 3000 },
  
  // Métadonnées
  addedBy: { type: String, required: true },
  photo: String,
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Beazina', beazinaSchema);
