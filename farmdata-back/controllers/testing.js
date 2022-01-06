const router = require('express').Router()
const Measurement = require('../models/measurement')
const Farm = require('../models/farm')
const helper = require('../tests/test_helper')

router.post('/reset', async (request, response) => {
  await Measurement.deleteMany({})
  await Farm.deleteMany({})
  await Farm.insertMany(helper.farms)

  response.status(204).end()
})

module.exports = router