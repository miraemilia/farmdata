const Measurement = require('../models/measurement')

const farms = [
  {
    _id: '5a422a851b54a676234d17f4',
    name: 'Noora\'s farm',
    measurements: []
  },
  {
    _id: '5a422a851b54a676234d17f5',
    name: 'Friman Metsola collective',
    measurements: []
  },
  {
    _id: '5a422a851b54a676234d17f6',
    name: 'Organic Ossi\'s Impact That Lasts plantase',
    measurements: []
  },
  {
    _id: '5a422a851b54a676234d17f7',
    name: 'PartialTech Research Farm',
    measurements: []
  }
]

const initialData = [
  {
    farm: '5a422a851b54a676234d17f7',
    date: new Date('2022-01-04T18:33:56.486+00:00'),
    type: 'rainFall',
    value: 50
  },
  {
    farm: '5a422a851b54a676234d17f4',
    date: new Date('2022-01-03T16:15:56.486+00:00'),
    type: 'rainFall',
    value: 120
  },
]

const newData = [
  {
    farm: 'Friman Metsola collective',
    date: new Date('2022-01-05T16:14:56.486+00:00'),
    type: 'pH',
    value: 10
  },
  {
    farm: 'PartialTech Research Farm',
    date: new Date('2022-01-02T16:14:56.486+00:00'),
    type: 'rainFall',
    value: 194
  }
]

const measurementsInDb = async () => {
  const measurements = await Measurement.find({})
  return measurements.map(m => m.toJSON)
}

module.exports = { farms, initialData, newData, measurementsInDb }