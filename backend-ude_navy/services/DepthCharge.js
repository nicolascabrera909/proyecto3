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
    setPositionX(time) {
        this.time = time;
    }
    setPositionY(depth) {
        this.depth = depth;
    }
   
}


