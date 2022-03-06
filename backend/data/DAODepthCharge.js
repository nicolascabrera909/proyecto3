const pool = require('./Database');
const queries = require('./Queries'); 
const DepthCharge = require('../services/DepthCharge.js')

class DAODepthCharge {

    constructor() {}

    async insert(idDestructor,depthCharge) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertDepthCharge(),[idDestructor, depthCharge.time, depthCharge.depth]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(submarineId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findDepthCharge(),[submarineId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAODepthCharge;