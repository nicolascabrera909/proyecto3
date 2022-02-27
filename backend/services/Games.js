//importo las clases que necesito
const Player = require('./Player.js')
const Game = require('./Game.js')
const Submarine = require('./Submarine.js')
const Destructor = require('./Destructor')
// const Cannon = require('./Cannon.js')
// const Torpedo = require('./Torpedo.js')
// const Difficulty = require('./Difficulty.js')
const Freighters = require('./Freighters.js')
const Map = require('./Map')
//const { prependListener } = require('../data/Database.js')

class Games {
    /*Constructor*/
    constructor() {
        this.game=null;
        this.map = new Map();

        //singleton de la clase
        if (typeof Games.instance === "object") {
            return Games.instance;
        }
        Games.instance = this;
        return this;
    }

    getGame() {
        return this.game;
    }

    logicaSubmarino(map) {
        //obtengo coordenadas del submarino y lo creo
        var theSubmarin = new Submarine(map);
        //creo la lista de botes y agrego al submarino
        return [theSubmarin];
    }

    partidaNueva(player, difficulty) {
        //creo la lista de jugadores de la partida
        var playerList = [];
        //agrego al jugador a la lista de jugadores
        playerList.push(player);
        //creo la partida
        this.game = new Game(playerList, difficulty);
    }
  
    partidaExistente(player) {
        //agrego al jugador a la lista de jugadores de la partida
        this.game.playerList.push(player);
    }

    createGame(playerSelected, socketId, difficulty) {
        if (playerSelected.boatTeam === 'submarino') {
            console.log("*************submarino*************");
            var boatList = this.logicaSubmarino(this.map);
            
            var player = new Player(playerSelected.name, playerSelected.socketId, boatList, playerSelected.boatTeam);

            //valido si hay que crear la partida o agregar a una existente
            if (this.game==null) {
                this.partidaNueva(player, difficulty)
            } else {
                this.partidaExistente(player)
            }
        } else if (playerSelected.boatTeam === 'destructor') {
            console.log("++++++++++DESTRUCTOR++++++++++");
            var coordenadaAux = {
                "x": 0,
                "y": 0
            };
            var aux = new Freighters(coordenadaAux);
            //falta crear los cargueros y agregarlos a la lista de botes
            var listaCoordendas = aux.coordenadasCargueros(this.map.width, this.map.height);
            var FreightersA = new Freighters(listaCoordendas[0]);
            var FreightersB = new Freighters(listaCoordendas[1]);
            var FreightersC = new Freighters(listaCoordendas[2]);
            var FreightersD = new Freighters(listaCoordendas[3]);
            var FreightersE = new Freighters(listaCoordendas[4]);
            var FreightersF = new Freighters(listaCoordendas[5]);

            var theDestructor = new Destructor(difficulty);

            theDestructor.coordenadas(listaCoordendas);
            //creo la lista de botes y agrego al al destructor y los cargueros
            var boatList = [theDestructor, FreightersA, FreightersB, FreightersC, FreightersD, FreightersE, FreightersF];
            var player = new Player(playerSelected.name, playerSelected.socketId, boatList, playerSelected.boatTeam);
            console.log("termine de crear al jugador, valido si existe partida");
            if (this.game==null) {
                this.partidaNueva(player, difficulty);
            } else {
                this.partidaExistente(player);
            }
        }
    }

    deletePlayer(socketId) {
        //busco el indice del arreglo del
        var i = 0;
        var encontre = false;
        var pos = 0;
        while (i < this.game.playerList.length && !encontre) {
            if (this.game.playerList[i].socketId == socketId) {
                encontre = true;
                pos = i;
            }
            i++;
        }
        this.game.playerList.splice(pos, 1);
    }
}

module.exports = Games;