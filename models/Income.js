const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
  name:     { type: String },
  user_id:  { type: Schema.Types.ObjectId, ref: 'users' },
  category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  source:   { type: Schema.Types.ObjectId, ref: 'sources',    required: true },
  value:    { type: Number, required: true },
  date:     { type: Date, default: Date.now },
  currency: { type: String, default: "$" },
});

module.exports = Income = mongoose.model('income', IncomeSchema);
