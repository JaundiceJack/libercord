const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = Income = mongoose.model('income', IncomeSchema);
