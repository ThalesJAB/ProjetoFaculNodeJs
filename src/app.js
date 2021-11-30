const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const router = express.Router();

//Conecta ao banco
mongoose.connect('mongodb+srv://thales:86948019@cluster0.oocf4.mongodb.net/BancoLoja');





//Carrega os Models
const Cliente = require('../api/models/clienteModel');
const Funcionario = require('../api/models/funcionarioModel');
const Produto = require('../api/models/produtoModel');


//Carrega as Rotas
const index = require('../api/routes/indexRoute');
const clienteRouts = require('../api/routes/clienteRouts');
const funcionarioRouts = require('../api/routes/funcionarioRouts');
const produtoRouts = require('../api/routes/produtoRouts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.use('/', index);
app.use('/clientes', clienteRouts);
app.use('/produtos', produtoRouts);
app.use('/funcionarios', funcionarioRouts);


module.exports = app;