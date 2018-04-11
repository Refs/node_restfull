var mongoose  = require('mongoose');

var ProductSchema = mongoose.Schema;

var productSchema = new ProductSchema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})


module.exports = productSchema;