require('dotenv').config()
const path = require('path')
const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// eslint-disable-next-line import/order
const UserSchema = require('./models/User')

const { Nuxt, Builder } = require('nuxt')
const app = express()

// Connect to mongo database
const dburl = process.env.MONGO_DB_URL
console.log(
  `easy-answer:${path.basename(__filename).split('.')[0]}`,
  'connecting....',
  dburl
)

// mongoose.connect(dburl).then(() => {
//   console.log('[DB Connected]: ', dburl)
// })

// CORS
// const whitelist = [ 'http://localhost:8080' ]
// const corsOptions = {
//   origin (origin, callback) {
//     const originIsWhitelisted = whitelist.includes(origin)
//     callback(null, originIsWhitelisted)
//   },
//   credentials: true
// }
app.use(cors())
app.options('*', cors())

app.use(session({
  secret: 'ironfundingdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Connect MongoDB
  mongoose.Promise = global.Promise
  await mongoose.connect(dburl)
  mongoose.model('User', UserSchema)

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // Transform req and res to have the same API as Express in Nuxt
  // So we can use res.status and res.json
  app.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
  })

  // ROUTES
  const index = require('./routes/index')
  const ticket = require('./routes/ticket')
  const auth = require('./routes/auth')
  app.use('/api', index)
  app.use('/api/ticket', ticket)
  app.use('/api/auth', auth)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
