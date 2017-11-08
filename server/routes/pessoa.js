var router = require('express').Router();
var authController = require('../controllers/pessoa_controller');

router.post('/create',authController.save);
router.get('/:id/edit',authController.edit);
router.get('/index',authController.listAll);
router.put('/update/:id',authController.update);

module.exports = router;