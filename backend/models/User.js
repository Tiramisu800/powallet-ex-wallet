const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  mnemonic: {
    type: String,
    required: true,
  },
  // Add any other fields you need
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
