const pool = require('./Database');
const queries = require('./Queries'); 
const DepthCharge = require('../services/DepthCharge.js')

class DAOCannon {

    constructor() {}

    async insert(depthCharge,shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertCannon(),[shipId, depthCharge.time, depthCharge.depth]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findCannon(),[shipId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAOCannon;