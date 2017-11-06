var router = require('express').Router();
var authController = require('../controllers/pessoa_controller');

router.post('/create',authController.save);
router.post('/edit',authController.edit);
router.get('/list',authController.listAll);

module.exports = router;