const pool = require('./Database');
const queries = require('./Queries'); 
const Cannon = require('../services/Cannon.js')

class DAOCannon {

    constructor() {}

    async insert(shipId,cannon) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertCannon(),[shipId, , cannon.cantMunicion]);
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
            return result[0];
        }
        else
            return ('Error');
    }  
    
    async lastCannonId(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.lastCannonId(),[shipId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    } 

    async update(shipId,cannon) {
        const consultas = new queries();
        const result = await pool.query(consultas.updateCannon(),[shipId, cannon.cantMunicion]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

}
module.exports = DAOCannon;