const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.get);

router.get('/all/:nome', clienteController.getByName);

router.post('/', clienteController.post);

router.put('/:id', clienteController.put);

router.delete('/', clienteController.delete);


module.exports = router;