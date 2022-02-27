


class Game {

    /*Constructor*/
    constructor(playerList, idDifficulty) {
        this.playerList = playerList;
        this.idDifficulty = idDifficulty;
    }
 
    /*Geters and seters*/
    getPlayerList() {
        return this.playerList;
    }

    getIdDifficulty() {
        return this.idDifficulty;
    }

    setPlayerList(playerList) {
        this.playerList = playerList;
    }

    setIdDifficulty(idDifficulty) {
        this.idDifficulty = idDifficulty;
    }



}

module.exports = Game;