var express = require('express');

var router = express.Router();

var deviceplatformController = require('../controllers/deviceplatform.controller')


router.get('/getLeftMenu', deviceplatformController.getLeftMenu);
router.get('/getLoginInfo', deviceplatformController.getLoginInfo);

module.exports = router;