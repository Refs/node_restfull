var express = require('express');
var router = express.Router();

var productsController = require('../controllers/products.controller')

var checkAuth =  require('../middleware/check-auth')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
      },
      
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
      }
});

var fileFilter = (req,file,cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});





router.get('/', productsController.products_get_all)
router.post('/', checkAuth, upload.single('productImage'), productsController.products_create_product )

router.get('/:productID', productsController.products_get_product)

router.patch('/:productId', checkAuth, productsController.products_update_product);

router.delete('/:productId', checkAuth, productsController.products_delete_product);



module.exports = router;