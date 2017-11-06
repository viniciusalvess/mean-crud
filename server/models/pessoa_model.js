var mongoose = require('../config/mongoose_connection');

var PessoaSchema = mongoose.Schema({
    nome:  String,
    nascimento: Date
});

var Pessoa = mongoose.model('Pessoa', PessoaSchema);
module.exports = Pessoa;