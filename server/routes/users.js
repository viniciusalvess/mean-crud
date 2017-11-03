var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/test', function (req, res, next) {
    console.log(req.user);
    res.json({'msg': 'Hello from NodeJS server'});
});

module.exports = router;
