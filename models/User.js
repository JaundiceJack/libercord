const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  signUpDate: {
    type: Date,
    default: Date.now
  },
  startingBalance: {
    type: Number,
    default: 0
  },
  passwordResetToken: String,
  passwordResetExpire: Date
})

module.exports = User = mongoose.model('user', UserSchema);
