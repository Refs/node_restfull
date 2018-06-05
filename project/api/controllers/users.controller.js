var mongoose =  require('mongoose');
mongoose.Promise = global.Promise;
var UserModel = require('../models/user.model.server');

exports.users_user_sinup = (req,res,next)=> {
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
                     // 接收手动抛出的错误！
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
 
 }

 exports.users_user_login = (req,res,next) => {
    let loginUser;
    UserModel.findUser(req.body.email)
        .then(
            (user) => {
                if (user.length < 1) {
                    var authFailError = new Error('');
                    authFailError.message = 'Auth Failed';
                    authFailError.status = +401;
                    throw authFailError;
                } else {
                    loginUser = user[0];
                    return UserModel.comparePassword(req.body.password, user[0].password)
                }
            }
        )
        .then(
            (result) => {
                if (! result) {
                    var authFailError = new Error('');
                    authFailError.message = 'Auth Failed';
                    authFailError.status = +401;
                    throw authFailError;
                } else {
                    return UserModel.createToken(
                        // promise 中的每一个链条 都有一个独立的异步函数，每个回调函数都有一个独立的变量作用域。回调函数之间的变量不能共享
                        // 即user 是上一个回调函数中的变量，不可以写在此处；
                        // 关键字：如何在Promise链中共享变量？ 
                        //  https://zhuanlan.zhihu.com/p/29052022
                        {
                            email: loginUser.email,
                            userId: loginUser._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    )
                }
            }
        )
        .then(
            (token) => {
                res.status(200)
                    .json({
                        message: "Auth successful",
                        token: token,
                        userData: {
                            id: loginUser.id,
                            email: loginUser.email
                        }
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
}

exports.users_user_delete = (req, res, next) => {
    UserModel.deleteUser(req.params.userId)
        .then(
            (result) => {
                res.status(200)
                    .json({
                        message: 'User deleted',
                        result: result
                    })
                    .catch(
                        (err) => {
                            res.status(500)
                                .json({
                                    error: err
                                })
                        }
                    )
            }
        )
}