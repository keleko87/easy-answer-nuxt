// eslint-disable-next-line import/order
const Ticket = require('../server/models/Ticket')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const express = require('express')
const bodyParser = require('body-parser')

// CONNECT MONGO DB
const dburl = process.env.MONGO_DB_URL
mongoose.connect(dburl).then(() => {
  console.log('DB Connected', dburl)
})

const router = express.Router()
const app = express()

app.use(session({
  secret: 'ironfundingdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(bodyParser.json())

// const index = require('./routes/index')
// const ticket = require('./routes/ticket')
// const auth = require('./routes/auth')
// app.use('/', index)
// app.use('/ticket', ticket)
// app.use('/auth', auth)

// ROUTER

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/track-data', (req, res) => {
  console.log('Stored data!')
  res.status(200).json({ message: 'Success!' })
})

/* GET home page. */
router.get('/ticket/list', (req, res) => {
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
