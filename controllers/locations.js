const express = require('express');
const router = express.Router()
const Locations = require('../models/locations.js')

router.post('/', (req, res) => {
  Locations.create(req.body, (err, createdLocation) => {
    console.log(createdLocation);
  })
})

router.delete('/:id', (req, res) => {
  Locations.findByIdAndRemove(req.params.id, (err, deletedLocation) => {
    console.log(deletedLocation);
  })
})

router.put('/:id', (req,res) => {
  Locations.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, updatedLocation) => {
      console.log(updatedLocation);
    })
})

router.get('/', (req, res) => {
  Locations.find({}, (err, foundLocation) => {
    console.log(foundLocation);
  })
})

module.exports = router;
