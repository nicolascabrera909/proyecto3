const pool = require('./Database');
const queries = require('./Queries'); 
const Map = require('../services/Map.js')

class DAOMap {

    constructor() {}
  
    //aca le paso o un destructor, submarino o un carguero
    async insert(map,gameId) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertMap(),[gameId, map.heigth,map.width]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(gameId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findMap(),[gameId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAOMap;