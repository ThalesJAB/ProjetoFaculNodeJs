const mongoose = require('mongoose');
const Funcionario = mongoose.model('Funcionario');
const repository = require('../repositories/funcionarioRepository');

//retorna todos os funcionarios
exports.get = async (req, res, next) => {

    try {
        var funcionarios = await repository.get()

        res.status(200).send(funcionarios);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            erro: e
        });
    }



}

//retorna todos os usuarios com nome igual ao params ex /all/Otavio 
exports.getByName = async (req, res, next) => {
    try {
        var funcionarios = await repository.getByName(req.params.nome);
        res.status(200).send(funcionarios);


    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            erro: e
        });

    }
}


//cria um novo funcionario
exports.post = async (req, res, next) => {

    try {
        var validacao = await repository.create(req.body);
        if (validacao == null) {
            res.status(400).send({ message: 'Falha ao cadastrar funcionario' });

        } else {
            res.status(201).send({ message: 'Funcionario cadastrado com sucesso!' });
        }

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }



};

//altera algum funcionario pelo seu id no parâmetro
exports.put = async (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        var validacao = await repository.edit(req.params.id, req.body);

        if (validacao == null) {
            res.status(400).send({
                message: 'Falha ao atualizar funcionario ou funcionario não encontrado'

            });
        } else {
            res.status(200).send({
                message: 'Funcionario atualizado com sucesso!'
            });
        }

    } else {
        res.status(400).send({
            message: 'Requisição ínvalida',


        });
    }
}

//deleta um funcionario
exports.delete = async (req, res, next) => {
    var validacao = await repository.delete(req.body.cpf);

    if (!validacao) {
        res.status(400).send({
            message: 'Falha ao remover funcionario'

        });
    } else {
        res.status(200).send({
            message: 'Funcionario removido com sucesso!'
        });
    }

}

