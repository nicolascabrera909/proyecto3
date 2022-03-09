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

    async find(idDestructor) {
        const consultas = new queries();
        const result = await pool.query(consultas.findDepthCharge(),[idDestructor]);
        if (result != null) {
           return result[0];
        }
        else
            return ('Error');
    }        

    async update(idDestructor,depthCharge) {
        const consultas = new queries();
        const result = await pool.query(consultas.updateDepthCharge(),[idDestructor, depthCharge.time, depthCharge.depth]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

}
module.exports = DAODepthCharge;