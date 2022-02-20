class Boat {

    /*Constructor*/
    constructor() {
        this.positionX;
        this.positionY;
        this.boatLife;
        this.visibility;
    }

    isDestroy(){
        return true;
    }

    /*Getters and setters*/
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getBoatlife() {
        return this.boatLife;
    }
    getBoatType() {
        return this.boatType;
    }
    getVisibility() {
        return this.visibility;
    }
    setPositionX(positionX) {
        this.positionX = positionX;
    }
    setPositionY(positionY) {
        this.positionY = positionY;
    }
    setBoatlife(boatLife) {
        this.boatLife = boatLife;
    }
    setBoatType(boatType) {
        this.boatType = boatType;
    }
    setVisibility(visibility) {
        this.visibility = visibility;
    }

}
export default Boat;
