const Armament = require('./Armament.js')

class Cannon extends Armament{
    
     /*Constructor*/
     constructor() {
        super();
    }

    setPower(val){
        return 1;
    }

}

module.exports = Cannon;