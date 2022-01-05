const mongoose = require('mongoose')

const measurementSchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm'
  },
  date: Date,
  type: String,
  value: Number
})

measurementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Measurement', measurementSchema)