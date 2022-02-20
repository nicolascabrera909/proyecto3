class Game {

    /*Constructor*/
    constructor(playerList, idMap, idDifficulty) {
        this.playerList = playerList;
        this.idMap = idMap;
        this.idDifficulty = idDifficulty;
    }

    /*Geters and seters*/
    getPlayerList() {
        return this.playerList;
    }
    getIdMap() {
        return this.idMap;
    }
    getIdDifficulty() {
        return this.idDifficulty;
    }

    setPlayerList(playerList) {
        this.playerList = playerList;
    }
    setIdMap(idMap) {
        this.idMap = idMap;
    }
    setIdDifficulty(idDifficulty) {
        this.idDifficulty = idDifficulty;
    }



}

export default Game;
