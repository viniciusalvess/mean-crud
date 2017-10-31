var router = require('express').Router();
var authController = require('../controllers/auth_controller');

router.post('/login',authController.login);
router.post('/register', authController.register);

module.exports = router;
