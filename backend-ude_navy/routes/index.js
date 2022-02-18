
const Games = require('../services/Games.js');
const express = require('express');
const router = express.Router();

const pool = require('../persistence/database');

router.get('/', (req, res) => {
    res.send('Bienvenidos a UDE Navy');
});
  
router.get('/version', async (req, res) => {
    const version = await pool.query('SELECT version FROM udenavybd.version');
    if (version.length > 0) 
        res.send(version[0].version);
    else
        res.send('0');
});

/*buscar coordenadas para submarino*/
router.get('/coordenadasSubmarino/:param', async (req, res) => {
        console.log(req.params);
        console.log(req.body);
        //metodo para devolver cordenadas de manera random
        var nuevoGame= new Game();
        var lasCoordenadas=nuevoGame.coordenadasBarcos();
        res.send(lasCoordenadas);
   
});

/*buscar coordenadas para submarino*/
router.get('/coordenadas/:param', async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    //metodo para devolver cordenadas de manera random
    coor={
        "x":"500",
        "y":"70"
    }
    res.send(coor);

});

module.exports = router;
