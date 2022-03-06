const pool = require('./Database');
const queries = require('./Queries'); 
const DepthCharge = require('../services/DepthCharge.js')

class DAODifficulty {

    constructor() {}

    async insert() {
        const consultas = new queries();
        const result = await pool.query(consultas.insertDifficulty());
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find() {
        const consultas = new queries();
        const result = await pool.query(consultas.findDifficulty(),);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAODifficulty;