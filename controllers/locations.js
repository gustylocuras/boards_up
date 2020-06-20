const express = require('express');
const router = express.Router()
const Locations = require('../models/locations.js')

router.post('/', (req, res) => {
  Locations.create(req.body, (err, createdLocation) => {
    console.log(createdLocation);
  })
})

module.exports = router;
