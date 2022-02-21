const pool = require('./Database');
const queries = require('./Queries'); 

class DAOVersion {

    constructor() {}

    async version() {
        const consultas = new queries();
        const result = await.pool.query(consultas.version());
        console.log('valor del result' + result);
        if (result != null) {
            console.log('entro al result');
            return result.id;
        }
        else
            return ('123')
    }        

}
module.exports = DAOVersion;