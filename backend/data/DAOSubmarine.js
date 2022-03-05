const pool = require('./Database');
const queries = require('./Queries'); 
const Sumarine = require('../services/Submarine')

class DAOSumarine {

    constructor() {}

    async insert(sumarine,shipId) {
        const consultas = new queries();ship_id,s_depth
        const result = await pool.query(consultas.insertSubmarine(),[shipId, sumarine.depth]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findSubmarine(),[shipId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAOSumarine;