class Submarine extends Ship {

    /*Constructor*/
    constructor(depth) {
        super();
        this.depth = depth;
    }

    /*Geters and seters*/
    getDepth() {
        return this.depth;
    }

    setDepth(depth) {
         this.depth=depth;
    }


}
export default Submarine;