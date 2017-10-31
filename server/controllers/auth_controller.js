var authService = require('../services/auth.service');

module.exports.login = function (req, res, next){
    var loginInfo = req.body;
    console.log(loginInfo.email,loginInfo.password);
    authService.login(loginInfo.email,loginInfo.password)
    .then(function (user) {
        res.send(user);
    }).catch(function (err) {
        res.status(400).send(err);
    });
};

module.exports.register = function (req, res, next){
    authService.register(req.body);
};
