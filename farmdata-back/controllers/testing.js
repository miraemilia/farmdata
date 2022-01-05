const router = require('express').Router()
const Measurement = require('../models/measurement')
const Farm = require('../models/farm')

router.post('/reset', async (request, response) => {
  await Measurement.deleteMany({})
  await Farm.deleteMany({})

  response.status(204).end()
})

module.exports = router