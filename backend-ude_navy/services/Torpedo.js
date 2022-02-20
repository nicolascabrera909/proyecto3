import Armament from './Armament.js'

class Torpedo extends Armament {

    /*Constructor*/
    constructor(time, depth) {
        super();
        this.time=time;
        this.depth=depth;
        //const Torpedo = new Armament;
    }

}

export default Torpedo;