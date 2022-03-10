const pool = require('./Database');
const queries = require('./Queries');
const Ship = require('../services/Ship.js')

class DAOShip {

    constructor() { }

    //aca le paso o un destructor, submarino o un carguero
    async insert(playerId,boatTeam ,ship) {
        let x=ship.positionX.valueOf();
        let y=ship.positionY.valueOf();
        let r=ship.rotation;
        const consultas = new queries();
        const result = await pool.query(consultas.insertShip(), [playerId, x, y,r, ship.boatLife, boatTeam]);
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
            return result;
        }
        else
            return ('Error');
    }

    async lastShipId(playerId) {
        const consultas = new queries();
        const result = await pool.query(consultas.lastShipId(), [playerId]);
        if (result != null) {
            return result[0].id;
        }
        else
            return ('Error');
    }

    async update(playerId, ship) {
        const consultas = new queries();
        const result = await pool.query(consultas.updateShip(), [playerId, ship.positionX, ship.positionY, ship.rotation, ship.boatLife]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    }

}
module.exports = DAOShip;