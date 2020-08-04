const express = require('express');
const router = express.Router()
const Locations = require('../models/locations.js')

router.post('/', (req, res) => {
  Locations.create(req.body, (err, createdLocation) => {
    // sends back just the holiday that you created in the database. Specifically used when interacting with Postman and shows you the object you created returned as a json object.
    res.json(createdLocation);
  })
})

router.delete('/:id', (req, res) => {
  Locations.findByIdAndRemove(req.params.id, (err, deletedLocation) => {
    res.json(deletedLocation);
  })
})

router.put('/:id', (req,res) => {
  Locations.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, updatedLocation) => {
      res.json(updatedLocation);
    })
})

router.get('/', (req, res) => {
  Locations.find({}, (err, foundLocation) => {
    res.json(foundLocation);
  })
})

module.exports = router;
