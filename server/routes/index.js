const express = require('express')
const router = express.Router()
const Ticket = require('../models/Ticket')

/* GET home page. */
router.get('/all', (req, res, next) => {
  Ticket.find({}).populate('creatorId').exec()
    .then((tickets) => {
      let user
      if (req.user) { user = req.user }
      res.json({ user, tickets })
    })
    .catch(err => console.log(err))
})

module.exports = router
