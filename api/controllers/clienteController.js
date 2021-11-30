const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const repository = require('../repositories/clienteRepository');


//esse get retorna so usuarios que estão com status true, e ao lado os atributos que preciso
exports.get = async (req, res, next) => {
    try {
        var clientes = await repository.get();
        res.status(200).send(clientes);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
    });
    }
}


// get que procura pelo nome
exports.getByName = async(req, res, next) => {
    try {
        var clientes = await repository.getByName(req.params.nome);
        res.status(200).send(clientes);

    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

// cria cliente
exports.post = async (req, res, next) => {
    try {
        var validacao = await repository.create(req.body);

        if (validacao == null) {
            res.status(400).send({ message: 'Falha ao cadastrar cliente' });

        } else {

            res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
        }

    } catch (e) {

        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }


}

//atualiza cliente
exports.put = async (req, res, next) => {

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        var validacao = await repository.edit(req.params.id, req.body);

        if (validacao == null) {
            res.status(400).send({
                message: 'Falha ao atualizar cliente ou cliente não encontrado'

            });
        } else {
            res.status(200).send({
                message: 'Cliente atualizado com sucesso!'
            });
        }

    } else {
        res.status(400).send({
            message: 'Requisição ínvalida',


        });
    }
}

//deleta cliente
exports.delete = async (req, res, next) => {

    var validacao = await repository.delete(req.body.cpf);

    if (!validacao) {
        res.status(400).send({
            message: 'Falha ao remover cliente'

        });
    } else {
        res.status(200).send({
            message: 'Cliente removido com sucesso!'
        });
    }

}
