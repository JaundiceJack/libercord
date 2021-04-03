const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Liability Schema
const LiabilitySchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
