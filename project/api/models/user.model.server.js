
const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = require("../shemas/user.schema.server");

const UserModel =  mongoose.model('User', userSchema);


function findUser ( email ) {
    return UserModel.find({
        email: email
    })
}

function deleteUser ( userId ) {
    return UserModel.remove({
        _id: userId
    })
}

function hashPassword ( password ) {
    return bcrypt.hash( password , 10 )
}

function comparePassword (clientPassword, dbPassword) {
    return bcrypt.compare(clientPassword, dbPassword)
}

function createToken(payload, secretOrPrivateKey,options) {
    return new Promise( (resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err,token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        })
    } )
}

function createUser (user) {
    return UserModel.create(user)
}

UserModel.findUser = findUser;
UserModel.hashPassword = hashPassword;
UserModel.comparePassword = comparePassword;
UserModel.createUser = createUser;
UserModel.createToken = createToken;
UserModel.deleteUser = deleteUser;


module.exports = UserModel;