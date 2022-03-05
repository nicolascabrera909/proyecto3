const Armament = require('./Armament.js')

class Cannon extends Armament{
    
     /*Constructor*/
     constructor(cantMunicion) {
        super();
        this.cantMunicion=cantMunicion;
    }

    setPower(val){
        return 1;
    }

}

module.exports = Cannon;