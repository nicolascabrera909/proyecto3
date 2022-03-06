const pool = require('./Database');
const queries = require('./Queries'); 
const Destructor = require('../services/Destructor.js')

class DAODestructor {

    constructor() {}

    async insert(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertDestructor(),[shipId]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findDestructor(),[shipId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAODestructor;