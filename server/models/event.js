'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    name: String,
    location: String,
    address: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Event = mongoose.model('Event', EventSchema)

module.exports = Event