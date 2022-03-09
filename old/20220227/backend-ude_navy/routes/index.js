const express = require('express');
const router = express.Router();
const controller = require('../controllers/Controller'); 

router.get('/', controller.index); 

router.get('/version', controller.version);

router.get('/partida', controller.partida);

router.get('/ready', controller.ready);

module.exports = router;

