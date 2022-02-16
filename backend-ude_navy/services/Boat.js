class Boat {

    /*Constructor*/
    constructor(positionX, positionY, boatLife, boatType, visibility) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.boatLife = boatLife;
        this.boatType = boatType;
        this.visibility = visibility;
    }

    /*Geters and seters*/
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
