const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports = Category = mongoose.model('categories', CategorySchema);
