const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Asset Schema
const AssetSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number
  },
  acquisition: {
    type: Date,
    default: Date.now
  },
  units: {
    type: String,
    default: ""
  },
  interest: {
    type: Number
  }
});

module.exports = Asset = mongoose.model('asset', AssetSchema);
