const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  name:         { type: String, required: true },
  user_id:      { type: Schema.Types.ObjectId, ref: 'users' },
  category:     { type: Schema.Types.ObjectId, ref: 'categories', required: true },
  amount: {
    owned: { type: Number },
    units: { type: String, default: "token" },
    unit_price: { type: Number },
  },
  date: { type: Date, default: Date.now },
  currency:  { type: String, default: "$" },
  interest:      { type: Number }
});

module.exports = Asset = mongoose.model('asset', AssetSchema);
