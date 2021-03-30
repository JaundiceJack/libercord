const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Liability Schema
const LiabilitySchema = new Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  interest: {
    type: Number
  }
});

module.exports = Liability = mongoose.model('liability', LiabilitySchema);
