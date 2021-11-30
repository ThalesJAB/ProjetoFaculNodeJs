const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');


exports.get = async () => {
    var produtos = await Produto.find({ status: true }, 'titulo preco descricao') // separando para trazer apenas o titulo, preco e descricao
    return produtos;
}

exports.getByTitle = async (titulo) => {
    var produtos = await Produto.find({ titulo: titulo, status: true });
    return produtos;

}

exports.getByTag = async (tag) => {
    var produtos = await Produto.find({ tags: tag, status: true }, 'titulo descricao preco tags');
    return produtos;


}


exports.create = async (body) => {
    var produto = new Produto();
    produto.titulo = body.titulo;
    produto.status = body.status;
    produto.descricao = body.descricao;
    produto.preco = body.preco;
    produto.tags = body.tags;

    var resultado = await produto.save();

    return resultado;
}

exports.edit = async (id, body) => {
    var ProdutoBanco = await Produto
        .findById(id).exec();


    if (ProdutoBanco == null) {
        return ProdutoBanco;

    } else {
        ProdutoBanco.titulo = body.titulo;
        ProdutoBanco.status = body.status;
        ProdutoBanco.descricao = body.descricao;
        ProdutoBanco.preco = body.preco;
        ProdutoBanco.tags = body.tags;

        var resultado = await ProdutoBanco.save();

        return resultado
    }


}

exports.delete = async (id) => {
    try {
        var ProdutoBanco = await Produto.find({ _id: id }).exec();

        if (ProdutoBanco.length == 0) {
            return false;
        } else {
            var num = await Produto.deleteOne({ _id: id });

            if (num.deletedCount == 1) {
                return true;
            } else {
                return false;
            }

        }
    } catch (e) {
        return false;
    }

}