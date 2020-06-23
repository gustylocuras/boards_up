const express = require('express')
const router= express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')


//creates session
router.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (err, foundUser) => {
    if(foundUser === null){
      res.json({
        message:'user not found'
      })
    } else {
      const doesPassMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if(doesPassMatch){
        req.session.user = foundUser
        res.json(foundUser)
      } else {
        res.json({
          message: 'password not found'
        })
      }
    }
  })
})

//creates cookie

router.get('/', (req, res) => {
  res.json(req.session.user)
})

//destroy cookie
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json({
      destroyed: true
    })
  })
})

module.exports = router
