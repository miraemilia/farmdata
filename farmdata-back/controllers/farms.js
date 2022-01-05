const farmRouter = require('express').Router()
const Farm = require('../models/farm')

farmRouter.get('/', async (request, response) => {
  const farms = await Farm.find({}).populate('measurements')
  response.json(farms.map(f => f.toJSON()))
})

module.exports = farmRouter