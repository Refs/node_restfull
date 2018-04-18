var mongoose = require('mongoose');
var orderSchema = require('../shemas/order.schema.server');

var OrderModel = mongoose.model('Order', orderSchema);

function createOrder(order) {
    return OrderModel.create(order);
}

function findAllOrder() {
    return OrderModel.find();
}

function findOrderById(orderId) {
    return OrderModel.findById(orderId);
}

function deleteOrderById(orderId) {
    return OrderModel.remove({
        _id: orderId
    })
}

OrderModel.createOrder = createOrder;
OrderModel.findAllOrder = findAllOrder;
OrderModel.findOrderById = findOrderById;
OrderModel.deleteOrderById = deleteOrderById;

module.exports = OrderModel;