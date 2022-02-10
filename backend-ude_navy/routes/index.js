const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Hello World!');
});
  
router.get('/version', async (req, res) => {
    var version = await pool.query('SELECT version FROM udenavybd.version');
    res.send(version);
});

module.exports = router;
