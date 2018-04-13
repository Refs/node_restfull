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
                    // res.status(409)
                    //     .json({
                    //         message: "Mail Already Exists"
                    //     });
                    // 此处需要运用 `中断或取消 Promise 链 的技术`，否则 当前的then 执行完毕之后，后续的then 一样会继续执行； 导致node 出现，res 已经返回，不能再修改res的错误；具体看自己的readme文档； 
                    // 此处手动 抛错，直接抛到尾端的额catch() 里面去执行；
                    // throw new Error('Mail Already Exists', status)  ----> 手动抛错
                    var repeatError = new Error('');
                    repeatError.message = 'Mail Already Exists';
                    // 利用+ 转化为数字  利用!! 转化为布尔值
                    repeatError.status = +409;

                    throw repeatError;

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
                if (err.status) {
                    res.status(err.status)
                        .json({
                            message: err.message
                        })
                } else {
                    res.status(500)
                    .json({
                        error: err
                    })
                }
            }
        )

})

module.exports = router;