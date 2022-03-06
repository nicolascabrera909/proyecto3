const pool = require('./Database');
const queries = require('./Queries'); 
const Torpedo = require('../services/Torpedo.js')

class DAOTorpedo {

    constructor() {}

  
    async insert(idSubmarin,torpedo) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertTorpedo() ,[idSubmarin,torpedo.cantidad]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(submarineId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findTorpedo() ,[submarineId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAOTorpedo;