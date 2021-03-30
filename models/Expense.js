const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
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

module.exports = Expense = mongoose.model('expense', ExpenseSchema);
