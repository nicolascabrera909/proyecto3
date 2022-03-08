const pool = require('./Database');
const queries = require('./Queries'); 
const Submarine = require('../services/Submarine.js')

class DAOSubmarine {

    constructor() {}

    async insert(shipId,submarine) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertSubmarine(),[shipId, submarine.depth,submarine.type]);
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
    
    async lastSubmarineId(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.lastSubmarineId(),[shipId]);
        if (result != null) {
            return result[0].id;
        }
        else
            return ('Error');
    }
    async update(submarineId,depth) {
        const consultas = new queries();
        const result = await pool.query(consultas.updateSubmarine(),[submarineId, depth]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 
}
module.exports = DAOSubmarine;