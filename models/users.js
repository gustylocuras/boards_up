const mongoose = require('mongoose');
const Location = require('./locations.js')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  locations: [Location.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User
