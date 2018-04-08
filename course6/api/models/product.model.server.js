var mongoose = require('mongoose');
var productSchema = require('../shemas/product.schema.server');

var  ProductModel = mongoose.model('Product', productSchema);

function createProduct(product) {
    return ProductModel.create(product);
}

function findAllProducts() {
    return ProductModel.find();
}

function findProductById(productId) {
    return ProductModel.findById(productId);
}

function updateProductById(productId, productConfig) {
    return ProductModel.update(
        {_id: productId},
        {$set: productConfig}
    )
}

ProductModel.createProduct = createProduct;
ProductModel.findAllProducts = findAllProducts;
ProductModel.findProductById = findProductById;
ProductModel.updateProductById = updateProductById;

module.exports = ProductModel;

