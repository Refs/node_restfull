var express = require('express');
var mongoose =  require('mongoose');
var router = express.Router();
var UserModel = require('../models/user.model.server');


mongoose.Promise = global.Promise;


router.post('/signup', (req,res,next)=> {
    UserModel.find(
        {email: req.body.email}
    )
    .then(
        (user) =>{
            if(user){
                res.status(409)
                    .json({

                    })
            }
        }
    )
})

module.exports = router;