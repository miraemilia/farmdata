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

describe('GET tests', () => {
  test('data returned as json', async () => {
    await api
      .get('/api/measurements')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})