const Measurement = require('../models/measurement')

const farms = [
    {
        _id: "5a422a851b54a676234d17f4",
        name: "Noora's farm",
        measurements: []
    },
    {
        _id: "5a422a851b54a676234d17f5",
        name: "Friman Metsola collective",
        measurements: []
    },
    {
        _id: "5a422a851b54a676234d17f6",
        name: "Organic Ossi's Impact That Lasts plantation",
        measurements: []
    },
    {
        _id: "5a422a851b54a676234d17f7",
        name: "PartialTech Research Farm",
        measurements: []
    }
]

const initialData = [
    {
        farm: "5a422a851b54a676234d17f7",
        date: new Date('2022-01-04T18:33:56.486+00:00'),
        type: "rainFall",
        value: 50
    },
    {
        farm: "5a422a851b54a676234d17f4",
        date: new Date('2022-01-03T16:15:56.486+00:00'),
        type: "rainFall",
        value: 120
    },
]

module.exports = { farms, initialData }