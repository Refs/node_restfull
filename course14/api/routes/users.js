var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.controller')
var checkAuth = require('../middleware/check-auth')

router.post('/signup', usersController.users_user_sinup)

router.post('/login', usersController.users_user_login)

router.delete('/:userId', checkAuth, usersController.users_user_delete )

module.exports = router;