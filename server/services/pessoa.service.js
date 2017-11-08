var PessoaModel = require('../models/pessoa_model');
var Q = require('q');

var pessoaService = {
    'save': save,
    'edit': edit,
    'listAll': listAll,
    'update': update
};

module.exports = pessoaService;

function save(aPessoa) {
    var deferred = Q.defer();
    PessoaModel.create(aPessoa, function (err) {
        if (err) {
            deferred.reject(new Error('Erro ao salvar pessoa'));
        }
        // deferred.resolve({message: 'Pessoa salva com sucesso !'});
        deferred.resolve('Pessoa salva com sucesso !');
    });
    return deferred.promise;
}

function edit(aId) {
    return PessoaModel.findOne({_id: aId}).exec();
}

function listAll() {
    var deferred = Q.defer();
    PessoaModel.find({}, function (err, pessoas) {
        if (err) {
            deferred.reject(new Error('Erro ao listar todas pessoa'));
        }
        deferred.resolve(pessoas);
    });

    return deferred.promise;
}

function update(aId,aPessoa){
    return PessoaModel.findByIdAndUpdate(aId, { $set: aPessoa}, { new: true });
}
