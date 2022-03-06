const pool = require('./Database.js');
const Queries = require('./Queries.js'); 
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

    async find() {
        const consultas = new Queries();
        //let a =consultas.findGamea();
        const result = await pool.query(consultas.findGame);///falat terminar
        if (result != null) {
            result[0];
        } 
        else
            return ('Error');
    }        

}
module.exports = DAOGame;