const pool = require('./Database');
const queries = require('./Queries'); 
const Destructor = require('../services/Destructor.js')

class DAODestructor {

    constructor() {}

    async insert(shipId,type) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertDestructor(),[shipId,type]);
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
            return result[0];
        }
        else
            return ('Error');
    }        

    async lastDestructorId(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.lastDestructorId(),[shipId]);
        if (result != null) {
            return result[0].id;
        }
        else
            return ('Error');
    }

}
module.exports = DAODestructor;