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



    createGame(name, boatTeam, socketId, mapa, difficulty) {
        if (boatTeam === 'submarino') {
            //obtengo coordenadas del submarino y lo creo
            // esta linea la cambiaria -- >var coordenadas = this.coordenadasSubmarino();
            var theSubmarin = new Submarine();
            //creo la lista de botes y agrego al submarino
            var boatList = [theSubmarin];
            //creo el jugador
            var player = new Player(name, socketId, boatList, boatTeam);

            //valido si hay que crear la partida o agregar a una existente
            if (this.getGameList().length == 0) {
                //creo la lista de jugadores de la partida
                var playerList = [];
                //agrego al jugador a la lista de jugadores
                playerList.push(player);
                //creo la partida
                var match = new Game(playerList, mapa, difficulty);
                //inserta al final del array
                this.gameList.push(match);
            } else {
                //agrego al jugador a la lista de jugadores de la partida
                this.getGameList()[0].playerList.push(player);
            }
        } else {

            //creo el destructor
            var coordenadaAux = {
                "x": 0,
                "y": 0
            };
            var aux = new Freighters(coordenadaAux);
            //falta crear los cargueros y agregarlos a la lista de botes
            var listaCoordendas = aux.coordenadasCargueros(800, 600);
            var FreightersA = new Freighters(listaCoordendas[0]);
            var FreightersB = new Freighters(listaCoordendas[1]);
            var FreightersC = new Freighters(listaCoordendas[2]);
            var FreightersD = new Freighters(listaCoordendas[3]);
            var FreightersE = new Freighters(listaCoordendas[4]);
            var FreightersF = new Freighters(listaCoordendas[5]);
            var theDestructor = new Destructor(difficulty);
            //creo la lista de botes y agrego al al destructor y los cargueros
            var boatList = [theDestructor, FreightersA, FreightersB, FreightersC, FreightersD, FreightersE, FreightersF];
            //creo el jugador
            var player = new Player(name, socketId, boatList, boatTeam);
            if (this.gamePlay.getGameList().length == 0) {
                //creo la lista de jugadores de la partida
                var playerList = [];
                //agrego al jugador a la lista de jugadores
                playerList.push(player);
                //creo la partida
                var match = new Game(playerList, mapa, difficulty);
                //inserta al final del array
                this.gameList.push(match);
            } else {
                //agrego al jugador a la lista de jugadores de la partida
                this.gamePlay.getGameList()[0].playerList.push(player);
            }

/*
            //creo la lista de jugadores de la partida
            var playerList = [];
            //agrego al jugador a la lista de jugadores
            playerList.push(player);
            //creo variable nivel y dificultad, estos datos los podemos definir en la base de datos
            var nivel = 1;
            var mapaId = 1;
            //creo la partida
            var match = new Game(playerList, mapaId, nivel);
            //inserta al final del array
            this.gameList.push(match);*/

        }

        //creo la lista de botes y se la asigno al jugadores

        //return this.gameList;

    }
    /*
        UnirGame(name, bandoBarcos, socketId,) {
    
            if (bandoBarcos === 'submarino') {
                //obtengo coordenadas del submarino y lo creo
                var coordenadas = this.coordenadasSubmarino();
                var elSubmarino = new Submarino(coordenadas);
                //creo la lista de botes y agrego al submarino
                var boatList = [elSubmarino];
                //creo el jugador
                var player2 = new Player(name, socketId, boatList);
                //agrego al jugador a la lista de jugadores
                this.getGameList()[0].getPlayerList().push(player2);
    
            } else {
                var elDestructor = new Destructor(coordenadas);
                //falta crear los cargueros y agregarlos a la lista de botes
    
                //creo la lista de botes y agrego al al destructor y los cargueros
                var boatList = [elSubmarino, cargeroA, cargeroB, cargeroC, cargeroD, cargeroE, cargeroF];
                //creo el jugador
                var player2 = new Player(name, socketId, boatList);
            }
    
            //creo la lista de botes y se la asigno al jugadores
    
    
    
        }*/



    saveGame(String) {
        //guarda la partida 
    }

    laodGame() {
        //carga la partida
    }












}

module.exports = Games;