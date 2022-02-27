class Player {

    /*Constructor*/
    constructor(name, socketId, boatList, boatTeam) {
        this.name = name;
        this.boatList = boatList;
        this.socketId = socketId;
        this.boatTeam = boatTeam
    }

    /*Geters and seters*/
    getName() {
        return this.name
    }
    getBoatList() {
        return this.boatList
    }
    setName(name) {
        this.name = name;
    }
    setBoatList(boatList) {
        this.boatList = boatList;
    }

    getBoatTeam() {
        return this.boatTeam;
    }
    setBoatTeam(boatTeam) {
        this.boatTeam = boatTeam;
    }
}

module.exports = Player;