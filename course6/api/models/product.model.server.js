var mongoose = require('mongoose');
var productSchema = require('../shemas/product.schema.server');

var  ProductModel = mongoose.model('Product', productSchema);

function createProduct(product) {
    return ProductModel.create(product);
}

ProductModel.createProduct = createProduct;

module.exports = ProductModel;

