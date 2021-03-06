var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ProductModel = require('../models/product.model.server');

exports.products_get_all =  (req, res, next) => {
    ProductModel.findAllProducts().select("name price _id productImage").then(
            (docs) => {
                const response = {
                    count: docs.length,
                    products: docs.map(
                        doc => {
                            return {
                                name: doc.name,
                                price: doc.price,
                                productImage: doc.productImage,
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
}

exports.products_create_product = (req, res, next) => {
    
    const product = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })

    ProductModel.createProduct(product).then(
            (result) => {
                res.status(201).json({
                    message: "Created product successfully",
                    createdProduct: {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        productImage: result.productImage,
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
}

exports.products_get_product = (req, res, next) => {
    const id = req.params.productID;
    ProductModel.findProductById(id)
        .select('name price productImage')
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
}

exports.products_update_product = (req, res, next) => {
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
}

exports.products_delete_product = (req, res, next) => {
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

}