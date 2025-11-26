const mongoose = require('mongoose');

const fivondronanaSchema = new mongoose.Schema({
  fivondronana_id: {
    type: Number,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true
  },
  description: String,
  region: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Fivondronana', fivondronanaSchema);
