var mongoose =  require('mongoose');
var express = require('express');
var OrderModel = require('../models/order.model.server');
var ProductModel = require('../models/product.model.server');
var router = express.Router();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    OrderModel
        .findAllOrder()
        .select("productId quantity _id")
        .then(
            docs =>{
                res.status(200).json({
                    count: docs.length,
                    orders: docs.map( doc => {
                        return {
                            _id: doc._id,
                            productId: doc.productId,
                            request: {
                                type: 'GET',
                                url: 'http://127.0.0.1:3000/orders/' + doc._id
                            }
                        }
                    } )
                })
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    error: err
                })
            }
        )
});

// 生成订单的时候，需要提供产品的相关信息，包块产品的_id 以及 产品的数量，即发送生成订单的请求的时候，应该去携带这两部分的信息

router.post('/', (req, res, next) => {

    var productId = req.body.productId;
    var quantity = req.body.quantity;

    ProductModel.findProductById( productId )
        .then(
            // 我们应该去手动处理，product不存在的情况，因为默认情况西 mongodb若找不到product 其不会报错，而只会返回一个null;
            (product) => {
                if ( ! product ) {
                    res.status(404)
                        .json({
                            message: "coundn't find spec product "
                        })
                } 

                var order = {
                    _id : mongoose.Types.ObjectId(),
                    productId: product._id,
                    quantity: quantity,
                }
                return OrderModel.createOrder(order)
            }
        ).then(
            result => {
                res.status(201)
                    .json({
                        message: "Order stored",
                        createdOrder: {
                            _id: result._id,
                            productId: result.productId,
                            quantity: result.quantity
                        },
                        request: {
                            type: 'GET',
                            url: "127.0.0.1:3000/orders/" + result._id
                        }
                    })
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    errMessage: err
                })
            }
        );
      

});

router.get('/:orderId', (req, res, next) => {
    var orderId = req.params.orderId;

    OrderModel.findOrderById(orderId)
        .then(
            order => {
                if (! order) {
                    res.status(404)
                        .json({
                            message: 'Order not found'
                        })
                }
                res.status(200)
                    .json({
                        order: order,
                        request: {
                            type: 'GET',
                            url: "http://127.0.0.1:3000/orders"
                        }
                    })
            }
        )
        .catch(
            err => {
                res.status(500)
                    .json({
                        error: err
                    })
            }
        )
});

router.delete('/:orderId', (req, res, next) => {
    var orderId = req.params.orderId;

    OrderModel.deleteOrderById(orderId)
        .then(
            result => {
                res.status(200)
                    .json({
                        message: 'order deleted',
                        request: {
                            type: 'POST',
                            url: '127.0.0.1:3000/orders',
                            body: {
                                productId: 'ID',
                                quantity: 'Number'
                            }
                        }
                    })
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    error: err
                })
            }
        )
});

module.exports = router;