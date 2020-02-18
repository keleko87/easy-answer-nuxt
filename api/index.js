const bodyParser = require('body-parser')
const express = require('express')
// const mongoose = require('mongoose')
const Ticket = require('../server/models/Ticket')
const router = express.Router()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

/* GET home page. */
router.get('/list', (req, res) => {
  Ticket.find({})
    .populate('creatorId')
    .exec()
    .then((data) => {
      const tickets = data.map((ticket) => {
        const image = `${process.env.API_UPLOADS}${ticket.image}`
        const newTicket = Object.assign(ticket, { image })

        return newTicket
      })

      res.status(200).json(tickets)
    })
    .catch(err => console.log(err))
})

module.exports = {
  path: '/api',
  handler: router
}
