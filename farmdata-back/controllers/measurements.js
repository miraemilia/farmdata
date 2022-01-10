const measurementRouter = require('express').Router()
const Measurement = require('../models/measurement')
const Farm = require('../models/farm')
const fs = require('fs')
const csv = require('csv-parser')

const calculateStartDate = (year, month) => {
  console.log(year, month)
  return new Date(year, month, 1, 0, 0, 0, 0)
}

const calculateEndDate = (year, month) => {
  console.log(year, month)
  return new Date(year, month +1, 0, 23, 59, 59, 999)
}

const postMeasurement = async (request) => {
  const farmName = request.body.farm
  const farm = await Farm.findOne({name: farmName})
  const farmId = farm._id

  //create measurement from request and save to databases
  const measurement = new Measurement({
    farm: farmId,
    date: request.body.date,
    type: request.body.type,
    value: request.body.value
  })
  const savedMeasurement = await measurement.save()

  //add new measurement to farm
  const updatedMeasurements = farm.measurements.concat(savedMeasurement._id)
  await Farm.findByIdAndUpdate(farm._id, {measurements: updatedMeasurements})

  return savedMeasurement
}

measurementRouter.get('/:farmId/:type/:year/:month', async (request, response) => {
  console.log(request.params.farmId + ': ' + request.params.type)

  //calculate start and end dates
  const year = Number(request.params.year)
  const month = Number(request.params.month)
  console.log(year, month)
  const startDate = calculateStartDate(year, month)
  console.log(startDate)
  const endDate = calculateEndDate(year, month)
  console.log(endDate)

  const measurements = await Measurement
    .find({ 
      farm: request.params.farmId,
      type: request.params.type,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .populate('farm', { name: 1 })
  response.json(measurements.map(m => m.toJSON()))
})

measurementRouter.get('/min/:farmId/:type/:year/:month', async (request, response) => {
  const startDate = calculateStartDate(Number(request.params.year), Number(request.params.month))
  const endDate = calculateEndDate(Number(request.params.year), Number(request.params.month))
  const min = await Measurement
    .find({ 
      farm: request.params.farmId,
      type: request.params.type,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .sort({value: 1})
    .limit(1)
  console.log(min)
  response.json(min)
})

measurementRouter.get('/max/:farmId/:type/:year/:month', async (request, response) => {
  const startDate = calculateStartDate(Number(request.params.year), Number(request.params.month))
  const endDate = calculateEndDate(Number(request.params.year), Number(request.params.month))
  const max = await Measurement
    .find({ 
      farm: request.params.farmId,
      type: request.params.type,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .sort({value: -1})
    .limit(1)
  console.log(max)
  response.json(max)
})

measurementRouter.post('/', async (request, response) => {
  
  const savedMeasurement = await postMeasurement(request)

  response.status(201)
  response.json(savedMeasurement.toJSON())

})

measurementRouter.post('/reset', async (request, response) => {
  await Measurement.deleteMany({})
  response.status(204).end()
})

measurementRouter.post('/fetch', async (request, response) => {
  const files = ['Nooras_farm.csv', 'PartialTech.csv', 'friman-metsola.csv', 'ossi_farm.csv']

  files.forEach(file => {
    try {
      const path = 'files/'+file
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', async (data) => {
          try {
            const measurementRequest = {
              body: {
                farm: data.location,
                date: data.datetime,
                type: data.sensorType,
                value: data.value
              }
            }
            const response = await postMeasurement(measurementRequest)
            console.log(response)
          } catch (error) {
            console.log(error)
          }
        })
        .on('end', () => {
          console.log('ended')
        })
    } catch (error) {
      console.log(error)
      response.status(400).json({error: 'failed'})
    }
  })
  response.status(201)
})

module.exports = measurementRouter