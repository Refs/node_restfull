const mongoose =  require('mongoose');

const userSchema = require("../shemas/user.schema.server");

const UserModel =  mongoose.model('User', userSchema);


function findUser ( email ) {
    return UserModel.find({
        email: email
    })
}

function hashPassword ( password ) {
    
}

// function createUser (email,password) {
//     UserModel.find({
//         email: email
//     })
//     .then(
//         (user) => {
//             if (user.length >= 1) {
//                 return res.status(409).json({})
//             }
//         }
//     )
// }

UserModel.findUser = findUser;
UserModel.hashPassword = hashPassword;


module.exports = UserModel;