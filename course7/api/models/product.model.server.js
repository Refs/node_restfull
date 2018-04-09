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

function deleteProductById(productId) {
    return ProductModel.remove({
        _id: productId
    })
}

ProductModel.createProduct = createProduct;
ProductModel.findAllProducts = findAllProducts;
ProductModel.findProductById = findProductById;
ProductModel.updateProductById = updateProductById;
ProductModel.deleteProductById = deleteProductById;

module.exports = ProductModel;

