const mongoose = require('mongoose');

const UserMpSchema = new mongoose.Schema({
  carte: { type: String, required: true },             // mp-carte
  nom: { type: String, required: true },               // mp-nom
  prenom: { type: String, required: true },            // mp-prenom
  totem: { type: String, required: true },             // mp-totem
  sexe: { type: String, enum: ['L','V'], default: '' },// mp-fiv-sexe
  birth: { type: Date, required: true },              // mp-birth
  birthPlace: { type: String, required: true },       // mp-birth-place
  adress: { type: String, required: true },           // mp-adress
  phone: { type: String, required: true },            // mp-phone
  email: { type: String },                             // mp-email
  fb: { type: String },                                // mp-fb
  role: { type: String, required: true },             // mp-role
  sampana: { type: String, enum: ['MV','MS','MN','MNF'], default: '' }, // mp-sampana
  vady: { type: String, enum: ['E','T'], default: '' },           // mp-vady
  fivZanaka: { type: String, enum: ['E','T'], default: '' },      // mp-fiv-zanaka
  study: { type: String },                             // mp-study
  studyPlace: { type: String },                        // mp-study-place
  job: { type: String },                               // mp-job
  jobPlace: { type: String },                          // mp-job-place
  fik: { type: String },                               // mp-fik

  // Fivondronana / fiangonana
  fivLar: { type: Number },                            // mp-fiv-lar
  fivFiang: { type: String },                          // mp-fiv-fiang
  fivFiangSampanaHafa: { type: String },              // mp-fiv-fiang-sampana-hafa
  fivRegion: { type: String, enum: ['A','I','M','O','S'], default: '' }, // mp-fiv-region
  fivLV: { type: String },                             // mp-fiv-LV
  fivTM: { type: String },                             // mp-fiv-TM
  fivMA: { type: String },                             // mp-fiv-MA
  fivM: { type: String },                              // mp-fiv-M
  fivFTily: { type: Date },                            // mp-fiv-Ftily
  fivFMp: { type: Date },                              // mp-fiv-Fmp

  createdAt: { type: Date, default: Date.now },        // date création
  userId: { type: String, required: true }            // ID de l'utilisateur qui ajoute la fiche
});

module.exports = mongoose.model('UserMp', UserMpSchema);

