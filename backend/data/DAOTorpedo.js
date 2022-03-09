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
            return result[0];
        }
        else
            return ('Error');
    } 

    async update(idSubmarine,torpedo) {
        const consultas = new queries();
        const result = await pool.query(consultas.updateTorpedo() ,[idSubmarine,torpedo]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 
}
module.exports = DAOTorpedo;