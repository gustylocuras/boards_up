const mongoose = require('mongoose');
<<<<<<< HEAD
const Location = require('./locations.js')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  locations: [Location.schema]
=======

const userSchema = new mongoose.Schema({
  username: String,
  password: String
>>>>>>> master
});

const User = mongoose.model('User', userSchema);

module.exports = User
