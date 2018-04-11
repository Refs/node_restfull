var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema;

var orderSchema = new OrderSchema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = orderSchema;