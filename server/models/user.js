'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: [true, 'Email has to be unique']
    },
    password: {
        type: String,
        minlength: [6, 'Password should have min 6 characters']
    }
})

UserSchema.post('validate', doc =>{
    let hash = hashPassword(doc.password)
    doc.password = hash
})

const User = mongoose.model('User', UserSchema)

module.exports = User