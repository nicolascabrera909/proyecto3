const pool = require('./Database');
const queries = require('./Queries');
const Ship = require('../services/Ship.js')

class DAOShip {

    constructor() { }

    //aca le paso o un destructor, submarino o un carguero
    async insert(playerId, ship) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertShip(), [playerId, ship.positionX, ship.positionY, ship.boatLife, ship.boatType, ship.visibility]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    }

    async find(playerId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findShip(), [playerId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }

    async lastShipId(playerId) {
        const consultas = new queries();
        const result = await pool.query(consultas.lastShipId(), [playerId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }

}
module.exports = DAOShip;