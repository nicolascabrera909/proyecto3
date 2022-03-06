const pool = require('./Database');
const queries = require('./Queries'); 
const Pleyer = require('../services/Player.js')

class DAOPlayer {

    constructor() {}
  
    //aca le paso o un destructor, submarino o un carguero
    async insert(gameId,player) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertPlayer(),[gameId, player.name]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(gameId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findPlayer(),[gameId]);
        if (result != null) {
            return  result;
        }
        else
            return ('Error');
    }        

    async lastPlayerId(gameId) {
        const consultas = new queries();
        const result = await pool.query(consultas.lastPlayerId(),[gameId]);
        if (result != null) {
            return  result;
        }
        else
            return ('Error');
    } 

}
module.exports = DAOPlayer;