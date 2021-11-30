const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    setor: {
        type: String,
        required: true,
    },
    
    salario: {
        type: Number,
        required: true
    },

    cpf: {
        type: String,
        required: [true, 'O CPF é obrigatorio'],
        trim: true,
        index: true,
        unique: true
    },
    
    status: {
        type: Boolean,
        required: true,
        default: true
    }
});


module.exports = mongoose.model("Funcionario", schema);