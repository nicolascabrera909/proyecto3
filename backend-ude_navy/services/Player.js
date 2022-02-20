class Player {

    /*Constructor*/
    constructor(name,socketId,boatList) {
        this.name = name;
        this.boatList = boatList;
        this.socketId=socketId;
    }

    /*Geters and seters*/
    getName() {
        return this.name
    }
    getBoatList() {
        return this.boatList
    }
    setName(name) {
         this.name=name;
    }
    setBoatList(boatList) {
         this.boatList=boatList;
    }


}
export default Player;
