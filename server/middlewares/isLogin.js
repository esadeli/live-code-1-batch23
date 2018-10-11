'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function isLogin(req,res,next){
    // cek token
    if(req.headers.hasOwnProperty('token')){

        //get token
        jwt.verify(req.headers.token, process.env.SECRETTOKEN, (err,decoded)=>{
            let objdecoded = decoded
            if(!err){
                // validate user
        
                User.findOne({
                    _id: decoded.userid
                })
                  .then(user =>{
                     if(user){
                         req.decoded = objdecoded
                         next()
                     }else{
                         res.status(400).json({
                             msg: 'ERROR Token Verify, User Not Found'
                         })
                     }
                  })
                  .catch(error =>{
                     res.status(500).json({
                         msg: 'ERROR Find user TOKEN VERIFY ',err
                     })
                  })
            }else{
                res.status(500).json({
                    msg: 'ERROR TOKEN VERIFY ',err
                })
            }
        })
    }else{
        res.status(403).json({
            msg: 'User is not authorized'
        })
    }
}

module.exports = isLogin