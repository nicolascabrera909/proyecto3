 class DepthCharge {
    
     /*Constructor*/
     constructor(time, depth) {
        DepthCharge.prototype = new Armament;

        //super();
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