const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
  isDefault: { type: Boolean, default: false }
});

module.exports = Location = mongoose.model('locations', LocationSchema);
