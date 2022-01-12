// Noora's farm: '5a422a851b54a676234d17f4',
// Friman Metsola collective '5a422a851b54a676234d17f5',
// Organic Ossi's Impact That Lasts plantase: '5a422a851b54a676234d17f6',
// PartialTech Research Farm: '5a422a851b54a676234d17f7',

const initialData = [
  {
    farm: '5a422a851b54a676234d17f4',
    date: new Date('2022-01-03T16:15:56.486+00:00'),
    type: 'rainFall',
    value: 120
  },
  {
    farm: '5a422a851b54a676234d17f4',
    date: new Date('2022-01-04T16:15:56.486+00:00'),
    type: 'rainFall',
    value: 58
  },
  {
    farm: '5a422a851b54a676234d17f4',
    date: new Date('2022-01-08T16:15:56.486+00:00'),
    type: 'rainFall',
    value: 7
  },
  {
    farm: '5a422a851b54a676234d17f4',
    date: new Date('2022-01-09T16:15:56.486+00:00'),
    type: 'rainFall',
    value: 0
  },
  {
    farm: '5a422a851b54a676234d17f5',
    date: new Date('2022-01-05T16:14:56.486+00:00'),
    type: 'pH',
    value: 10
  },
  {
    farm: '5a422a851b54a676234d17f5',
    date: new Date('2022-01-07T16:14:56.486+00:00'),
    type: 'pH',
    value: 9
  },
  {
    farm: '5a422a851b54a676234d17f6',
    date: new Date('2022-01-02T16:14:56.486+00:00'),
    type: 'rainFall',
    value: 194
  },
  {
    farm: '5a422a851b54a676234d17f6',
    date: new Date('2022-01-04T16:14:56.486+00:00'),
    type: 'temperature',
    value: 1
  },
  {
    farm: '5a422a851b54a676234d17f7',
    date: new Date('2022-01-04T18:33:56.486+00:00'),
    type: 'temperature',
    value: -4
  },
  {
    farm: '5a422a851b54a676234d17f7',
    date: new Date('2022-01-05T18:33:56.486+00:00'),
    type: 'temperature',
    value: 0
  }
]

module.exports = { initialData }