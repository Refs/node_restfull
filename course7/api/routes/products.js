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

router.get('/', (req, res, next) => {
    ProductModel.findAllProducts().select("name price _id").then(
            (docs) => {
                const response = {
                    count: docs.length,
                    products: docs.map(
                        doc => {
                            return {
                                name: doc.name,
                                price: doc.price,
                                _id: doc._id,
                                request: {
                                    type: "GET",
                                    url: "http://127.0.0.1:3000/products/" + doc._id
                                }
                            }
                        }
                    )
                }

                res.status(200).json(response);
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})
router.post('/', (req, res, next) => {

    const product = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    ProductModel.createProduct(product).then(
            (result) => {
                res.status(201).json({
                    message: "Created product successfully",
                    createdProduct: {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        request: {
                            type: "GET",
                            url: "http://127.0.0.1:3000/products/" + result._id
                        }
                    }
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


})

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    ProductModel.findProductById(id)
        .then(
            (doc) => {
                if (doc) {
                    res.status(200).json({
                        product: doc,
                        request: {
                            type: "GET",
                            url: "http://127.0.0.1:3000/products"
                        }
                    });
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'No valid entry found for provided ID'
                        })
                }
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};
    for (let ops in req.body) {
        updateOps[ops] = req.body[ops];
    }
    ProductModel.updateProductById(productId, updateOps)
        .then(
            (result) => {
                res.status(201).json({
                    message: 'Product updated',
                    request: {
                        type: 'GET',
                        url: 'http://127.0.0.1:3000/products/' + productId
                    }
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;

    ProductModel.deleteProductById(productId)
        .then(
            (value) => {
                console.log(value);
                res.status(200).json({
                    message: 'Product deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/products',
                        body: {
                            name: 'String',
                            price: 'Number'
                        }
                    }
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});



module.exports = router;