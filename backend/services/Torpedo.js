const Armament = require('./Armament.js')

class Torpedo extends Armament {

    /*Constructor*/
    constructor(cantMunicion) {
        super();
        this.cantMunicion=cantMunicion;
        //const Torpedo = new Armament;
    }

}

module.exports = Torpedo;