
const express = require('express');
const router = express.Router();
const controller = require('../controllers/funcionarioController');

router.get('/', controller.get);

router.get('/all/:nome', controller.getByName);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router;