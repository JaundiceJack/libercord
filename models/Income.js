const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true
  },
  source: {
    type: String
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Income = mongoose.model('income', IncomeSchema);
