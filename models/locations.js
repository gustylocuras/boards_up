const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
  name: String,
  description: String,
  link: String,
  type: String,
  capacity: Number,
  img:String
})

const Locations = mongoose.model('Location', locationSchema);

module.exports = Locations;
