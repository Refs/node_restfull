var express = require('express');
var mongoose =  require('mongoose');
var router = express.Router();
var UserModel = require('../models/user.model.server');


mongoose.Promise = global.Promise;


router.post('/signup', (req,res,next)=> {
   UserModel.findUser(req.body.email)
        .then(
            (user) => {
                if (user.length >= 1) {
                    res.status(409)
                        .json({
                            message: "Mail Already Exists"
                        })
                } else {
                    return UserModel.hashPassword(req.body.password);
                }
            }
        )
        .then(
            (hash) => {
                const user = new UserModel({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
                return UserModel.createUser(user)
            }
        )
        .then(
            ( result ) => {
                console.log(result);
                res.status(200)
                    .json({
                        message: 'User created'
                    })
            }
        )
        .catch(
            (err) => {
                res.status(500)
                    .json({
                        error: err
                    })
            }
        )

})

module.exports = router;