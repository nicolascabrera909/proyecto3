const pool = require('./Database.js');
const Queries = require('./Queries.js');
const Game = require('../services/Game.js')

class DAOGame {

    constructor() { }

    //aca le paso o un destructor, submarino o un carguero
     insert(dificultadId) {
        const consultas = new queries();
        const result =  pool.query(consultas.insertGame(), [dificultadId]);
        if (result != null) {
            return ('OK')
        }
        else

            return ('Error');
    }

     find() {
        let resultado
        const consultas = new Queries();
        var result =  pool.query(consultas.findGame());
        if (result != null) {
            return result[0].id;
        }
        else {
            console.log('resultado error ');
            return ('Error');
        }
    }



}
module.exports = DAOGame;