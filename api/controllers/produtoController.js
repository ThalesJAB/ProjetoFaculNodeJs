
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const repository = require('../repositories/produtoRepository')

exports.get = async (req, res, next) => {

    try {
        var produtos = await repository.get();
        res.status(200).send(produtos);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}
// retorna todos os produtos com titulos igual ao params
exports.getByTitle = async (req, res, next) => {
    try {
        var produtos = await repository.getByTitle(req.params.titulo);
        res.status(200).send(produtos);

    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

// retorna os produtos relacionados a tag requisitada
exports.getByTag = async (req, res, next) => {
    try {
        var produtos = await repository.getByTag(req.params.tag);
        res.status(200).send(produtos);

    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

// cria um produto
exports.post = async(req, res, next) => {
    try {
        var validacao = await repository.create(req.body);
        if (validacao == null) {
            res.status(400).send({ message: 'Falha ao cadastrar produto' });

        } else {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
        }

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

};

// edita um produto
exports.put = async (req, res, next) => {

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        var validacao = await repository.edit(req.params.id, req.body);

        if (validacao == null) {
            res.status(400).send({
                message: 'Falha ao atualizar produto ou produto não encontrado'

            });
        } else {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        }

    } else {
        res.status(400).send({
            message: 'Requisição ínvalida',


        });
    }

};

// deleta um produto
exports.delete = async (req, res, next) => {
    var validacao = await repository.delete(req.body.id);

    if (!validacao) {
        res.status(400).send({
            message: 'Falha ao remover produto'

        });
    } else {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    }
}
