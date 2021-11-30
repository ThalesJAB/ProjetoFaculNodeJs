const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');


exports.get = async() => {
    var clientes = await Cliente.find({ status: true }, 'nome telefone cpf');
    return clientes;
}


exports.getByName = async(nome) => {
    var clientes = await Cliente.find({nome: nome, status: true});
    return clientes;

}

exports.create = async(body) =>{
    var cliente = new Cliente();
    cliente.nome = body.nome;
    cliente.telefone = body.telefone;
    cliente.status = body.status;
    cliente.cpf = body.cpf;

   var resultado =  await cliente.save();

   return resultado;

    
}



exports.edit = async (id, body) => {
    var ClienteBanco = await Cliente
        .findById(id).exec();


    if (ClienteBanco == null) {
        return ClienteBanco;

    } else {
        ClienteBanco.nome = body.nome;
        ClienteBanco.telefone = body.telefone;
        ClienteBanco.status = body.status;

        var resultado = await ClienteBanco.save();

        return resultado
    }
}



//deleta cliente
exports.delete = async (cpf) => {
    var ClienteBanco = await Cliente.find({ cpf: cpf }).exec();

    if (ClienteBanco.length == 0) {
        return false;
    } else {
        var num = await Cliente.deleteOne({ cpf: cpf });

        if (num.deletedCount == 1) {
            return true;
        } else {
            return false;
        }

    }
}


