const { model, Schema } = require('mongoose')
const eventTypes = require('./event-types')

const eventSchema = new Schema({
    type: {
        type: String,
        enum: Object.values(eventTypes),
        default: eventTypes.GENERIC,
        required: true
    },
    context: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const eventModel = model('events', eventSchema)

module.exports = {
    eventSchema,
    eventModel
}
