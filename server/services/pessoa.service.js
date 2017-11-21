var PessoaModel = require('../models/pessoa_model');
var Q = require('q');
var filterBuilder = require('./filter_builder.service');

var pessoaService = {
    'save': save,
    'edit': edit,
    'listAll': listAll,
    'update': update,
    'remove': remove,
    'search': search
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

function search(evt) {
    console.log(evt);
    var deferred = Q.defer();
    PessoaModel.find(filterBuilder.buildFilterFromPrimeNgLazyEvent(evt,{dateFields:['nascimento']}), function (err, pessoas) {
        if (err) {
            deferred.reject(new Error('Erro ao pesquisar pessoa'));
        }

        PessoaModel.count().exec(function(err, conta) {
            if (err) {
                deferred.reject(new Error('Erro ao contar pessoas'));
            }

            // console.log('conta', conta, 'length', pessoas.length);
            // (pessoas.length !== evt.rows) ? pessoas.length :  conta
            deferred.resolve({records: pessoas,count: conta});
        });
    }).skip(evt.first).limit(evt.rows);

    return deferred.promise;
}


function update(aId,aPessoa){
    return PessoaModel.findByIdAndUpdate(aId, { $set: aPessoa}, { new: true });
}

function remove(aId){
    return PessoaModel.findByIdAndRemove(aId).exec();
}
