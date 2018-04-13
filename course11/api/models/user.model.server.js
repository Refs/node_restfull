const mongoose =  require('mongoose');

const userSchema = require("../shemas/user.schema.server");

const UserModel =  mongoose.model('User', userSchema);

module.exports = UserModel;