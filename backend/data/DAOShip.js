const pool = require('./Database');
const queries = require('./Queries'); 
const Ship = require('../services/Ship.js')

class DAOShip {

    constructor() {}
    player_id ,positionX,positionY,boatLife,boatType,visibility

    this.positionX;
    this.positionY;
    this.rotation
    this.boatLife;
    this.visibility;
}
    async insert(playerId,ship) {
        const consultas = new queries();
        const result = await pool.query(consultas.insertCannon(),[playerId, ship.positionX,ship.positionY,ship.boatLife,ship.boatType]);
        if (result != null) {
            return ('OK')
        }
        else
            return ('Error');
    } 

    async find(shipId) {
        const consultas = new queries();
        const result = await pool.query(consultas.findCannon(),[shipId]);
        if (result != null) {
            result[0];
        }
        else
            return ('Error');
    }        

}
module.exports = DAOShip;