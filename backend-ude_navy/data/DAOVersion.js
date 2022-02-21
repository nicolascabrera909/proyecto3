const pool = require('./Database');
const queries = require('../data/Queries'); 

class DAOVersion {

    constructor() {
    }

    version() {
        const result = pool.query('SELECT version FROM udenavybd.version');
        if (result.length > 0) 
            return result.id;
        else
            return ('0')
    } 

}

module.exports = DAOVersion;