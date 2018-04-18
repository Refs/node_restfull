var express = require('express');
var checkAuth =  require('../middleware/check-auth')
var ordersController = require('../controllers/orders.controller')
var router = express.Router();


router.get('/', checkAuth, ordersController.orders_get_all);

// 生成订单的时候，需要提供产品的相关信息，包块产品的_id 以及 产品的数量，即发送生成订单的请求的时候，应该去携带这两部分的信息

router.post('/', checkAuth , ordersController.orders_create_order );

router.get('/:orderId', checkAuth, ordersController.orders_get_order );

router.delete('/:orderId', checkAuth , ordersController.orders_delete_order );

module.exports = router;