var mongoose = require('../config/mongoose_connection');

var PessoaSchema = mongoose.Schema({
    nome:  {
        type : String,
        required : true
    },
    nascimento : {
        type: Date,
        required: true
    },
    cpfCnpj: String,
    rgInsc: String,
    nomeFantasia: String,
    inscMunicipal: String,
    tipo: String,
    sexo : {
        type : String,
        required : true,
        enum: ['Masculino', 'Feminino']
    },
    nomePai : {
        type : String,
        required : true
    },
    nomeMae : {
        type : String,
        required : true
    },
    pisPasep: String,
    nacionalidade : {
        type : String,
        required : true
    },
    naturalidade : {
        type : String,
        required : true
    },
    necessidadeEsp : {
        type : String,
        enum: ['Sim', 'Não'],
        default : 'Não'
    },
    deficiencia : {
        type: String,
        required: function() {
            return (this.necessidadeEsp === 'Sim');
        }
    }
});

var Pessoa = mongoose.model('Pessoa', PessoaSchema);
module.exports = Pessoa;