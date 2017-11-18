var router = require('express').Router();
var authController = require('../controllers/pessoa_controller');

router.post('/create',authController.save);
router.get('/:id/edit',authController.edit);
router.get('/index',authController.listAll);
router.put('/:id',authController.update);
router.get('/:id/delete',authController.delete);
router.post('/search',authController.search);

module.exports = router;