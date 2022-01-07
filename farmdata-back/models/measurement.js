const mongoose = require('mongoose')

const measurementSchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: {
      values: ['rainFall', 'pH', 'temperature'],
      message: 'type must be pH, rainFall or temperature'
    },
    required: true
  },
  value: {
    type: Number,
    required: true,
    validate: {
      validator: function (number) {
        if (this.type === 'rainFall') {
          return number >= 0 && number <= 500 
        } else if (this.type === 'pH') {
          return number >= 0 && number <= 14
        } else if (this.type === 'temperature') {
          return number >= -50 && number <= 100
        }
      }
    },
    message: 'value is not in limits'
  }
})

measurementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Measurement', measurementSchema)