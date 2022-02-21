const pool = require('./Database');
const queries = require('./Queries'); 

class DAOVersion {

    constructor() {
        
    }

    
    version() {
        const consultas = new queries();
        console.log('valor del pool' + pool);
        const result = pool.query(consultas.version());
        console.log('a la salida del result');
        //console.log(result);
        //console.log('luego');
        if (result.length > 0) 
            return result.id;
        else
            return ('123')
    } 

}

module.exports = DAOVersion;