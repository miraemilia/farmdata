const measurementRouter = require('express').Router()
const Measurement = require('../models/measurement')
const Farm = require('../models/farm')

measurementRouter.get('/', async (request, response) => {
  const measurements = await Measurement.find({}).populate('farm', { name: 1 })
  response.json(measurements.map(m => m.toJSON()))
})

measurementRouter.post('/', async (request, response) => {
  const farmName = request.body.farm
  const farm = await Farm.findOne({name: farmName})
  const farmId = farm._id

  //create measurement from request and save to database
  const measurement = new Measurement({
    farm: farmId,
    date: request.body.date || Date.now(),
    type: request.body.type,
    value: request.body.value
  })
  const savedMeasurement = await measurement.save()
  response.status(201)
  response.json(savedMeasurement.toJSON())

  //add new measurement to farm
  const updatedMeasurements = farm.measurements.concat(savedMeasurement._id)
  await Farm.findByIdAndUpdate(farm._id, {measurements: updatedMeasurements})

})

measurementRouter.post('/reset', async (request, response) => {
  await Measurement.deleteMany({})
  response.status(204).end()
})

module.exports = measurementRouter