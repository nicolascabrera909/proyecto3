class Armament {

    /*Constructor*/
    constructor(power, distance, cantMunicion) {
        this.power = power;
        this.distance = distance;
        this.cantMunicion = cantMunicion;
    }

    /*Geters and seters*/
    getPower() {
        return this.power;
    }
    getDistance() {
        return this.distance;
    }
    getCantMunicion() {
        return this.cantMunicion;
    }
    setPower(power) {
        this.power = power;
    }
    setDistance(distance) {
        this.distance = distance;
    }
    setCantMunicion(cantMunicion) {
        this.cantMunicion = cantMunicion;
    }
}

module.exports = Armament;