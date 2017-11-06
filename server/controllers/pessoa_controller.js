var pessoaService = require('../services/pessoa.service');

module.exports.save = function (req, res, next){
    pessoaService.save(req.body).then(function(msg){
        res.json(msg);
    }).catch(function (err) {
        console.log(err);
        res.status(401).json(err.message);
    });
};

module.exports.listAll = function (req, res, next){
    pessoaService.listAll().then(function(msg){
        res.json(msg);
    }).catch(function (err) {
        console.log(err);
        res.status(401).json(err.message);
    });
};

module.exports.edit = function (req, res, next){
    pessoaService.edit(req.body.id).then(function(pes){
        res.json(pes);
    }).catch(function(err){
        console.log('Pessoa inexistente em nosso banco de dados: ', req.body.id);
        res.status(401).json(err.message);
    });
};
