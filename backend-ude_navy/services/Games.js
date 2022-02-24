//importo las clases que necesito
const Player = require('./Player.js')
const Game = require('./Game.js')
const Submarine = require('./Submarine.js')
const Destructor = require('./Destructor')
const Cannon = require('./Cannon.js')
const Torpedo = require('./Torpedo.js')
const Difficulty = require('./Difficulty.js')
const Freighters = require('./Freighters.js')

class Games {


    /*Constructor*/
    constructor() {
        this.gameList = [];

        //singleton de la clase
        if (typeof Games.instance === "object") {
            return Games.instance;
        }
        Games.instance = this;
        return this;
    }

    getGameList() {
        return this.gameList;
    }

    logicaSubmarino() {
        //obtengo coordenadas del submarino y lo creo
        // esta linea la cambiaria -- >var coordenadas = this.coordenadasSubmarino();
        var theSubmarin = new Submarine();
        //creo la lista de botes y agrego al submarino

        return [theSubmarin];
    }

    partidaNueva(player, difficulty) {
        //creo la lista de jugadores de la partida
        var playerList = [];
        //agrego al jugador a la lista de jugadores
        playerList.push(player);
        //creo la partida
        var match = new Game(playerList, difficulty);
        //inserta al final del array
        this.getGameList().push(match);


    }

    partidaExistente(player) {
        //agrego al jugador a la lista de jugadores de la partida
        this.getGameList()[0].playerList.push(player);
    }

    createGame(name, boatTeam, socketId, difficulty) {
        console.log('Ingrese al createGame. El gameList tiene ' + this.getGameList().length + ' elementos')
        // como vamos a controlar que no se cren mas de un juego??
        //if (this.getGameList()[0].playerList.length <= 2){
        console.log(boatTeam);
        if (boatTeam === 'submarino') {
            console.log("*************submarino*************");

            var boatList = this.logicaSubmarino();
            var player = new Player(name, socketId, boatList, boatTeam);

            //valido si hay que crear la partida o agregar a una existente
            if (this.getGameList().length == 0) {
                this.partidaNueva(player, difficulty)
            } else {
                this.partidaExistente(player)
            }
        } else if (boatTeam === 'destructor') {
            console.log("++++++++++DESTRUCTOR++++++++++");
            var coordenadaAux = {
                "x": 0,
                "y": 0
            };
            var aux = new Freighters(coordenadaAux);
            //falta crear los cargueros y agregarlos a la lista de botes
            var listaCoordendas = aux.coordenadasCargueros(800, 800); //// ver las cuentas en la funcion
            var FreightersA = new Freighters(listaCoordendas[0]);
            var FreightersB = new Freighters(listaCoordendas[1]);
            var FreightersC = new Freighters(listaCoordendas[2]);
            var FreightersD = new Freighters(listaCoordendas[3]);
            var FreightersE = new Freighters(listaCoordendas[4]);
            var FreightersF = new Freighters(listaCoordendas[5]);

            var theDestructor = new Destructor(difficulty);

            theDestructor.coordenadas(listaCoordendas, 800, 600);
            //creo la lista de botes y agrego al al destructor y los cargueros
            var boatList = [theDestructor, FreightersA, FreightersB, FreightersC, FreightersD, FreightersE, FreightersF];
            var player = new Player(name, socketId, boatList, boatTeam);
            console.log("termine de crear al jugador, valido si existe partida");
            if (this.getGameList().length == 0) {
                this.partidaNueva(player, difficulty);
            } else {
                this.partidaExistente(player);
            }
        }
        //}
    }

    deletePlayer(socketId) {
        //busco el indice del arreglo del
        var i = 0;
        var encontre = false;
        var pos = 0;
        while (i < this.getGameList[0].playerList.length && !encontre) {
            if (this.getGameList[0].playerList[i].socketId == socketId) {
                encontre = true;
                pos = i;
            }
            i++;
        }
        var newArray = this.getGameList[0].playerList.slice(pos, pos + 1);
        console.log(newArray);
        this.getGameList[0].playerList = newArray;
    }



}

module.exports = Games;