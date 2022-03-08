const pool = require('./Database');
const queries = require('./Queries');
const Freighters = require('../services/Freighters.js')

class DAOFreighters {

    constructor() { }

    //aca le paso o un destructor, submarino o un carguero
    async insert(shipId,id) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertFreighters(), [shipId]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    }

    async find(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findFreighters(), [shipId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }

    async lastShipId(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.lastFreighterssId(), [shipId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }

}
module.exports = DAOFreighters;