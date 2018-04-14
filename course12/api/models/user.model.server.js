const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = require("../shemas/user.schema.server");

const UserModel =  mongoose.model('User', userSchema);


function findUser ( email ) {
    return UserModel.find({
        email: email
    })
}

function hashPassword ( password ) {
    return bcrypt.hash( password , 10 )
}

function createUser (user) {
    return UserModel.create(user)
}

UserModel.findUser = findUser;
UserModel.hashPassword = hashPassword;
UserModel.createUser = createUser;


module.exports = UserModel;