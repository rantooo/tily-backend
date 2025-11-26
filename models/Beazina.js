const mongoose = require('mongoose');

const UserBzSchema = new mongoose.Schema({
  carte: { type: String, required: true },             // bz-carte
  nom: { type: String, required: true },               // bz-nom
  prenom: { type: String, required: true },            // bz-prenom
  totem: { type: String },                              // bz-totem
  birth: { type: Date, required: true },               // bz-birth
  father: { type: String },                             // bz-father
  mother: { type: String },                             // bz-mother
  sampana: { type: String, enum: ['MV','MS','MN','MNF'], default: '' }, // bz-sampana

  // Fivondronana / fiangonana
  fivLar: { type: Number },                             // bz-fiv-lar
  fivFiang: { type: String },                            // bz-fiv-fiang
  fivRegion: { type: String, enum: ['A','I','M','O','S'], default: '' }, // bz-fiv-region
  fivFanek: { type: Date },                              // bz-fiv-Fanek

  // Ambaratonga / Talenta
  ambaratonga: { type: String },                        // Ambar
  talenta: { type: String },                             // T

  // Statut FAFI
  fafiStatus: { type: String, enum: ['N','P','V'], default: 'N' }, // bz-fafi-status

  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }             // ID de l'utilisateur
});

module.exports = mongoose.model('UserBz', UserBzSchema);
