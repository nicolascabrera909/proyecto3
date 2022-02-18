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

/*buscar coordenadas parea barcos*/
router.get('/coordenadas/:barco', async (req, res) => {
 
        //metodo para devolver cordenadas de manera random
        
        
        coor={
            "param": req.params,
            "x":"500",
            "y":"300"
        }
        res.send(coor);
   
});

module.exports = router;
