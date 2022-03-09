const express = require('express');
const router = express.Router();
const controller = require('../controllers/Controller'); 

router.get('/', controller.index); 

router.get('/version', controller.version);

router.get('/partida', controller.partida);

router.get('/ready', controller.ready);

router.get('/guardar', controller.guardar);

router.get('/cargar', controller.cargar);

router.get('/cancelar', controller.cancelar);

router.get('/lista', controller.lista);

module.exports = router;

