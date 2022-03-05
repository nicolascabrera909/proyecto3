const Armament = require('./Armament.js')
 
 class DepthCharge extends Armament{
    
     /*Constructor*/
     constructor(time, depth) {
        super();
        this.time = time;
        this.depth = depth;
        
    }

    /*Geters and seters*/
    getTime() {
        return this.time;
    }
    getDepth() {
        return this.depth;
    }
    setTime(time) {
        this.time = time;
    }
    setDepth(depth) {
        this.depth = depth;
    }
   
}

module.exports = DepthCharge;