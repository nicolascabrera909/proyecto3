const pool = require('./Database');
const queries = require('./Queries'); 

class DAOVersion {

    constructor() {}
    
    version() {
        const consultas = new queries();
        //console.log('valor del pool' + pool.query);
        const result = pool.query(consultas.version());
        //console.log('a la salida del result');
        /*
            RESULT ES LO QUE NO ESTA VINIENDO. ESTO ES LO QUE VIENE object Promise
        */
        console.log('valor del result' + result); 
        //console.log('luego');
        if (result != null) {
            console.log('entro al result');
            return result.id;
        }
        else
            return ('123')
    } 

}

module.exports = DAOVersion;