const express = require('express')
const app = express()
const Dataconnect = require('./db')
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const mongostore = require('connect-mongo')
const session = require('express-session')
const passport = require('passport')
require('./passportconfig')

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const mongo_store = mongostore.create({ mongoUrl: process.env.Mongo_URI })

app.use(
  session({
    secret: process.env.sessionsecret,
    resave: false,
    saveUninitialized: true,
    store: mongo_store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)

app.use(passport.initialize())
app.use(passport.session())

const routes = require('./router')

app.use('/api', routes)

const start = async () => {
  try {
    await Dataconnect(process.env.Mongo_URI)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`)
    })
  } catch (error) {
    console.log('Error starting server:', error)
  }
}

start()
