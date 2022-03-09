const pool = require('./Database.js');
const Queries = require('./Queries.js');
const Game = require('../services/Game.js')

class DAOGame {

    constructor() { }

    //aca le paso o un destructor, submarino o un carguero
    async insert(dificultadId) {
        const consultas = new Queries();
        const result = await pool.query(consultas.insertGame(), [dificultadId]);
        if (result != null) {
            return ('OK')
        }
        else

            return ('Error');
    }

    async find() {
        const consultas = new Queries();
        var result = await pool.query(consultas.findGame());
        if (result != null) {
            return result;
        }
        else {
            console.log('resultado error ');
            return ('Error');
        }
    }
    async findGameId(id) {
        try {
            const consultas = new Queries();
            var result = await pool.query(consultas.findGameId(), [id] );
            if (result != null) {
                return result[0];
            }
            else {
                console.log('resultado error ');
                return ('Error');
            }
        } catch (err) {
            console.log('falle  ' + err)
        }
    }

    async lastGame() {
        const consultas = new Queries();
        var result = await pool.query(consultas.lastGame());
        if (result != null) {
            return result[0].id;
        }
        else {
            console.log('resultado error ');
            return ('Error');
        }
    }

    async list() {
        const consultas = new Queries();
        var result = await pool.query(consultas.listGames());
        if (result != null) {
            return result;
        }
        else {
            console.log('resultado error ');
            return ('Error');
        }
    }

    async dificultad(dificultad) {
        const consultas = new Queries();
        var result = await pool.query(consultas.dificultad(dificultad));
        if (result != null) {
            return result;
        }
        else {
            console.log('resultado error ');
            return ('Error');
        }
    }

}
module.exports = DAOGame;