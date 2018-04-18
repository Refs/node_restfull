var mongoose  = require('mongoose');

var ProductSchema = mongoose.Schema;

var productSchema = new ProductSchema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: Number, required: true},
    productImage: {type: String}
})


module.exports = productSchema;