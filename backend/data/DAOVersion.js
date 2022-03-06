
const pool = require('./Database');
const queries = require('./Queries'); 

class DAOVersion {

    constructor() {}

    async version() {
        const consultas = new queries();
        const result = await pool.query(consultas.version());
        if (result != null) {
            return result[0].version;
        }
        else
            return ('Error');
    }        

}
module.exports = DAOVersion;