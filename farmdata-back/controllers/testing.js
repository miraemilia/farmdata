const router = require('express').Router()
const Measurement = require('../models/measurement')
const Farm = require('../models/farm')
const helper = require('../tests/test_helper')
const testData = require('../tests/test_data')

router.post('/reset', async (request, response) => {
  await Measurement.deleteMany({})
  await Farm.deleteMany({})
  await Farm.insertMany(helper.farms)
  await Measurement.insertMany(testData.initialData)

  response.status(204).end()
})

module.exports = router