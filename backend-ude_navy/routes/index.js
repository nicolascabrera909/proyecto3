const express = require('express');
const router = express.Router();

const pool = require('../persistencia/database');

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

module.exports = router;
