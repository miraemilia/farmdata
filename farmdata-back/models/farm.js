const mongoose = require('mongoose')

const farmSchema = new mongoose.Schema({
    name: String,
    measurements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Measurement"
        }
    ]
})

farmSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Farm', farmSchema)