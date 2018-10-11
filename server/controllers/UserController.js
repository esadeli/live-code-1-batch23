'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const hashPassword = require('../helpers/hashPassword')

class UserController {

    // register user
    static registerUser(req,res){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
          .then(user =>{
              res.status(201).json({
                  success: true,
                  message: `Account ${user.name} registered`
              })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Register User ',error
              })
          })
    }

    // login user
    static loginUser(req,res){
        let hash = hashPassword(req.body.password)
        User.findOne({
            email: req.body.email,
            password: hash
        })
          .then(user =>{
              if(user){
                // get jwt token
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN, (err,token)=>{
                    if(!err){
                        res.status(201).json({
                            token: token
                        })
                    }else{
                       res.status(500).json(`ERROR Login Token ${err}`) 
                    } 
                })
              }else{
                  res.status(400).send('Login Failed User not found')
              }
          })
          .catch(error =>{
              res.status(500).json(`ERROR Login User ${error}`)
          })
    }
}

module.exports = UserController