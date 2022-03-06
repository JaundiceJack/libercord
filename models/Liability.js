const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LiabilitySchema = new Schema({
  name:     { type: String, required: true },
  user_id:  { type: Schema.Types.ObjectId, ref: 'users' },
  category: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  balance: {
    initial: { type: Number },
    remaining: { type: Number },
    payed_total: { type: Number },
    payed_interest: { type: Number },
    payed_principle: { type: Number },
  },
  date: { type: Date, default: Date.now },
  currency:  { type: String, default: "$" },
  interest:      { type: Number }
});

module.exports = Liability = mongoose.model('liability', LiabilitySchema);
