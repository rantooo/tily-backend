const mongoose = require('mongoose');

const mpiandraikitraSchema = new mongoose.Schema({
  // Informations personnelles
  karatra2425: String,
  anarana: { type: String, required: true },
  anaranafanampiny: { type: String, required: true },
  totem: String,
  sexe: { type: String, enum: ['L', 'V'] },
  datynahaterahana: { type: Date, required: true },
  toerananahaterahana: String,
  toeranaiainana: String,
  tel: String,
  email: String,
  facebook: String,
  
  // Rôle et statut
  andraikitra: String,
  sampana: { type: String, enum: ['MV', 'MS', 'MN', 'MNF'] },
  manambady: { type: String, enum: ['E', 'T'] },
  mananjanaka: { type: String, enum: ['E', 'T'] },
  
  // Éducation et travail
  fianarana: String,
  toeranafianarana: String,
  asa: String,
  toeranaasa: String,
  fikambananahafatao: String,
  
  // Fivondronana
  fivondronana_id: Number,
  fiangonana: String,
  sampanahafataoaoampiangonana: String,
  faritra: { type: String, enum: ['A', 'I', 'M', 'O', 'S'] },
  taonanidiranlovitaovoronkely: String,
  taonanidiranatilympanazava: String,
  taonanidiranampiandalanafo: String,
  taonanidiranamenafify: String,
  datyfanekenatily: Date,
  datyfanekenampiandraikitra: Date,
  
  // Fiofanana
  groupe: { type: String, enum: ['Q', 'W', 'X', 'Z', 'V'] },
  
  // FAFI
  fafiStatus: { type: String, enum: ['V', 'P', 'N'], default: 'N' },
  fafiDate: Date,
  fafiAmount: { type: Number, default: 5000 },
  
  // Métadonnées
  addedBy: { type: String, required: true },
  photo: String,
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Mpiandraikitra', mpiandraikitraSchema);
