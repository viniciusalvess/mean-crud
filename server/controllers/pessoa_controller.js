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
    pessoaService.edit(req.params.id).then(function(pes){
        res.json(pes);
    }).catch(function(err){
        console.log('Pessoa inexistente em nosso banco de dados: ', err, req.body.id);
        res.status(401).json(err.message);
    });
};

module.exports.update = function (req, res, next){
    pessoaService.update(req.params.id,req.body).then(function(pes){
        res.json(pes);
    }).catch(function(err){
        console.log('Erro ao atualizar Pessoa : ', err, req.body.id);
        res.status(401).json(err.message);
    });
};

module.exports.delete = function (req, res, next){
    pessoaService.remove(req.params.id).then(function(pes){
        res.json(pes.nome + ' Excluído com sucesso');
    }).catch(function(err){
        console.log('Erro ao excluir Pessoa : ', err, req.params.id);
        res.status(401).json(err.message);
    });
};
