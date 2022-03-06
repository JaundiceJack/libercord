const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  name:     { type: String },
  user_id:  { type: Schema.Types.ObjectId, ref: 'users' },
  category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  location: { type: String },
  value:    { type: Number, required: true },
  date:     { type: Date, default: Date.now },
  currency: { type: String, default: "$" },
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);
