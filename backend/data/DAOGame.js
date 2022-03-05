const pool = require('./Database');
const queries = require('./Queries'); 
const Game = require('../services/Game.js')

class DAOGame {

    constructor() {}
  
    //aca le paso o un destructor, submarino o un carguero
    async insert(dificultadId) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertGame(),[dificultadId]);
        if (result != null) {
            return ('OK')
        }
        else

            return ('Error');
    } 

    async find(name1, name) {
        const consultas = new queries();
        const result = await pool.query(consultas.findGamea());///falat terminar
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAOGame;