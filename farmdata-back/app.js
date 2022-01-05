const express = require('express')
require('express-async-errors')
const app = express()
const measurementRouter = require('./controllers/measurements')
const farmRouter = require('./controllers/farms')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.use('/api/measurements', measurementRouter)
app.use('/api/farms', farmRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app