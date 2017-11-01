var config = require('../config.json');
var mongo = require('mongoskin');
var db = mongo.db(config.db_url, {native_parser: true});
var bcrypt = require('bcryptjs');
var Q = require('q');
var jwt = require('jsonwebtoken');
db.bind('users');

var authService = {
    'login': login,
    'register': register
};

module.exports = authService;

function login(aEmail, aPassword) {
    var deferred = Q.defer();
    db.users.findOne({'email': aEmail}, function (err, user) {
        if (err) {
            throw err;
        }

        if (user && bcrypt.compareSync(aPassword, user.password)) {
            deferred.resolve({
                username: user.username,
                email: user.email,
                token: jwt.sign({username: user.username, email: user.email}, config.secret)
            });
        } else {
            deferred.reject('Email ou Senha é inválido.');
        }
    });

    return deferred.promise;
}

function register(aUserObj) {
    if (!aUserObj.hasOwnProperty('username')) {
        return new Error("Propriedade username não encontrada para registrar novo usuário.");
    }

    if (!aUserObj.hasOwnProperty('password')) {
        return new Error("Propriedade password não encontrada para registrar novo usuário.");
    }

    if (!aUserObj.hasOwnProperty('name')) {
        return new Error("Propriedade name não encontrada para registrar novo usuário.");
    }

    if (!aUserObj.hasOwnProperty('lastname')) {
        return new Error("Propriedade lastname não encontrada para registrar novo usuário.");
    }

    var user = {
        username: aUserObj.username,
        name: aUserObj.name,
        lastname: aUserObj.lastname
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(aUserObj.password, salt, function (err, hash) {
            user.password = hash;
        });
    });

    db.users.insert(user);
}
