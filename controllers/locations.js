const express = require('express');
const router = express.Router()
const Locations = require('../models/locations.js')

router.post('/', (req, res) => {
  Locations.create(req.body, (err, createdLocation) => {
<<<<<<< HEAD
    res.json(createdLocation);
=======
    console.log(createdLocation);
>>>>>>> master
  })
})

router.delete('/:id', (req, res) => {
  Locations.findByIdAndRemove(req.params.id, (err, deletedLocation) => {
<<<<<<< HEAD
    res.json(deletedLocation);
=======
    console.log(deletedLocation);
>>>>>>> master
  })
})

router.put('/:id', (req,res) => {
  Locations.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, updatedLocation) => {
<<<<<<< HEAD
      res.json(updatedLocation);
=======
      console.log(updatedLocation);
>>>>>>> master
    })
})

router.get('/', (req, res) => {
  Locations.find({}, (err, foundLocation) => {
<<<<<<< HEAD
    res.json(foundLocation);
=======
    console.log(foundLocation);
>>>>>>> master
  })
})

module.exports = router;
