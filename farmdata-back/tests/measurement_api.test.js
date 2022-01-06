const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Measurement = require('../models/measurement')
const Farm = require('../models/farm')

beforeEach(async () => {
  await Farm.deleteMany({})
  await Measurement.deleteMany({})
  await Farm.insertMany(helper.farms) 
  await Measurement.insertMany(helper.initialData)
})

describe('Measurements: HTTP GET tests', () => {
  test('data returned as json', async () => {
    await api
      .get('/api/measurements')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all data is returned', async () => {
    const response = await api.get('/api/measurements')
    expect(response.body).toHaveLength(helper.initialData.length)
  })
})

describe('Measurements: HTTP POST tests', () => {
  test('database length increases by one', async () => {
    const lengthAtBeginning = await helper.measurementsInDb()
    await api
      .post('/api/measurements')
      .send(helper.newData[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/measurements')
    expect(response.body).toHaveLength(lengthAtBeginning.length +1)
  })
  test('added data is found', async () => {
    await api
      .post('/api/measurements')
      .send(helper.newData[1])
      .expect(201)
    const response = await api.get('/api/measurements')
    const values = response.body.map(m => m.value)
    expect(values).toContain(helper.newData[1].value)
  })
})

afterAll(() => {
  mongoose.connection.close()
})