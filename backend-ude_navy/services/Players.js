import Player from "./Player.js";

class Players {

    /*Constructor*/
    constructor(playerList) {
        this.playerList = playerList;
    }

    InsBack(player) {
        this.playerList.push(player);
    }

    Member(player) {
        //primera forma
        //return this.playerList.includes(player);
        //me queda la duda de como se hace para ingresar a los atributos de Player

        //segunda forma
        /*var esMember = false;
        for(var i = 0; i < playerList.length; i++){ 
            if (playerList[i.name] === player) { 
                esMember =  true;
            }
        }
        return myPlayer;*/
    }

    Find(player) {
        //primera forma
        //return this.playerList.find(player);
        //me queda la duda de como se hace para ingresar a los atributos de Player

        //segunda forma
        /*var myPlayer = new Player();
        for(var i = 0; i < playerList.length; i++){ 
            if (playerList[i.name] === player) { 
                myPlayer =  playerList[i];
            }
        }
        return myPlayer;*/
    }

    esVacia() {
        return this.playerList.length === 0;
    }

    DeletePlayer(player) {
        for (var i = 0; i < playerList.length; i++) {
            if (playerList[i.name] === player) {
                delete playerList[i];
            }
        }
    }

    OrderList(actual) {
        var array = new Array();
        for (var i = 0, j = actual.length; i < j; i++) {
            if (actual[i]) {
                array.push(actual[i]);
            }
        }
        return array;
    }
}

export default Players;