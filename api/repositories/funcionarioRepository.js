const mongoose = require('mongoose');
const Funcionario = mongoose.model('Funcionario');



exports.get = async () => {
    var funcionarios = await Funcionario.find({ status: true }, 'nome setor salario cpf'); // separando para trazer apenas o nome, setor, salario
    return funcionarios;

}

exports.getByName = async (nome) => {
    var funcionarios = await Funcionario.find({ status: true, nome: nome });
    return funcionarios;
}

exports.create = async (body) => {
    var funcionario = new Funcionario();
    funcionario.nome = body.nome;
    funcionario.status = body.status;
    funcionario.cpf = body.cpf;
    funcionario.setor = body.setor;
    funcionario.salario = body.salario;

    var resultado = await funcionario.save();

    return resultado;
}

exports.edit = async (id, body) => {
    var FuncionarioBanco = await Funcionario
        .findById(id).exec();


    
    if (FuncionarioBanco == null) {
        return FuncionarioBanco;

    } else {
        FuncionarioBanco.nome = body.nome;
        FuncionarioBanco.status = body.status;
        FuncionarioBanco.setor = body.setor;
        FuncionarioBanco.salario = body.salario;


        var resultado = await FuncionarioBanco.save();

        return resultado
    }

}

exports.delete = async (cpf) => {
    var FuncionarioBanco = await Funcionario.find({ cpf: cpf }).exec();

    if (FuncionarioBanco.length == 0) {
        return false;
    } else {
        var num = await Funcionario.deleteOne({ cpf: cpf });

        if (num.deletedCount == 1) {
            return true;
        } else {
            return false;
        }

    }
}

