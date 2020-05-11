const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
