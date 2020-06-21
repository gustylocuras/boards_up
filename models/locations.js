const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./users.js')


const locationSchema = new mongoose.Schema({
  name: String,
  description: String,
  link: String,
  type: String,
  capacity: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Locations = mongoose.model('Location', locationSchema);

module.exports = Locations;
