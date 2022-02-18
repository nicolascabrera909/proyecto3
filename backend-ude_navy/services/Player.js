class Player {

    /*Constructor*/
    constructor(name,boatList) {
        this.name = name;
        this.boatList = boatList;
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
