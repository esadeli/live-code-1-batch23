'use strict'

const Event = require('../models/event')

class EventController {

    // create Event
    static createEvent(req,res){
        Event.create({
            name: req.body.name,
            location: req.body.location,
            address: req.body.address,
            user: req.decoded.userid
        })
          .then(event =>{
            res.status(201).send(event)
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Create Event ',error
              })
          })
    }

    // list events
    static getListEvents(req,res){
        Event.find({})
         .then(events =>{
            res.status(200).send(events)
         })
         .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Get List Event ',error
            }) 
         })
    }
}

module.exports = EventController