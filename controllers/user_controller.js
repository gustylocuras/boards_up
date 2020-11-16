const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const bcrypt = require('bcrypt')

// Creats a new user by encrypting the password using the bcrypt package and stores the data in the database as a json object. 

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
     req.session.user = createdUser;
    res.json(createdUser)
  })

})

module.exports = router
