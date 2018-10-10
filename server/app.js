'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

mongoose.connect('mongodb://localhost:27017/livecode1phase23db', {useNewUrlParser: true});


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{ res.send('OK')})
app.listen(3001, () =>{
    console.log('Listening to PORT 3001')
})