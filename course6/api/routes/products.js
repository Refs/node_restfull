var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProductModel = require('../models/product.model.server');


mongoose.Promise = global.Promise;

// router.use(
//     (req, res, next) => {
//         res.status(200).json({
//         message: "Product Router works!"
//         })
//     }
// )

/**
 * A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.
 * 
 * 1. router 仅用来 挂在中间件，将匹配的请求，路由到某个函数中；
 * 2. app  之所以可以挂在路由或路由function 是因为其内置一个router; 
*/

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'Handing GET requests to /products'
    })
})
router.post('/',(req, res, next) => {

    const product = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    ProductModel.createProduct(product).then(
        () => {
            console.log('数据已经存储进去了')
        }
    )


})

router.get('/:productID',(req,res,next)=>{
    const id = req.params.productID;
    if (id === 'special') {
        res.status(200).json({
            message: 'you discover the special ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'you pass an ID',
            id: id
        })
    }
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});



module.exports = router;