var config = require('../config.json');
var User = require('../models/user_model');
var bcrypt = require('bcryptjs');
var Q = require('q');
var jwt = require('jsonwebtoken');

var authService = {
    'login': login,
    'register': register
};

module.exports = authService;

function login(aEmail, aPassword) {
    var deferred = Q.defer();
    User.findOne({'email': aEmail}).exec().then(function(user){
        bcrypt.compare(aPassword, user.password,function(err, isMatch){
            if (err) throw err;

            if (isMatch) {
                deferred.resolve({
                    username: user.name,
                    email: user.email,
                    token: jwt.sign({username: user.name, email: user.email}, config.secret, { expiresIn: config.token_expire})
                });
            } else {
                deferred.reject(new Error('Email ou Senha é inválido.'));
            }
        });
    }).catch(function(err){
        console.log('Usuário inexistente em nosso banco de dados: ', err);
        deferred.reject('Usuário inexistente em nosso banco de dados.');
    //
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
    };

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(aUserObj.password, salt, function (err, hash) {
            user.password = hash;
        });
    });

    db.users.insert(user);
}
