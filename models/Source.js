const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SourceSchema = new Schema({
  name: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports = Source = mongoose.model('sources', SourceSchema);
