'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const UserRoutes = require('./routes/UserRoutes')

mongoose.connect('mongodb://localhost:27017/livecode1phase23db', {useNewUrlParser: true});


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/users',UserRoutes)

app.get('/', (req,res)=>{ res.send('OK')})
app.listen(3000, () =>{
    console.log('Listening to PORT 3000')
})