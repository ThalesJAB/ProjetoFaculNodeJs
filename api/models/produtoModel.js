
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    
    descricao: {
        type: String,
        required: true,
    },
    
    preco: {
        type: Number,
        required: true
    },

    tags: [{
        type: String,
        required: true
    }],
    
    status: {
        type: Boolean,
        required: true,
        default: true
    }

});


module.exports = mongoose.model('Produto', schema);