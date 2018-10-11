'use strict'

const express = require('express')
const router = express.Router()
const EventController = require('../controllers/EventController')
const isLogin = require('../middlewares/isLogin')

router.post('/', isLogin, EventController.createEvent)
      .get('/', EventController.getListEvents)

module.exports = router