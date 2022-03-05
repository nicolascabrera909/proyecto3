const pool = require('./Database');
const queries = require('./Queries'); 
const Submarine = require('../services/Submarine.js')

class DAOSubmarine {

    constructor() {}

    async insert(submarine,shipId) {
        const consultas = new queries();ship_id,s_depth
        const result = await pool.query(consultas.insertSubmarine(),[shipId, submarine.depth]);
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
module.exports = DAOSubmarine;