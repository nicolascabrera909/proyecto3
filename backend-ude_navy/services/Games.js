//importo las clases que necesito
const Player = require('./Player.js')
const Game = require('./Game.js')
const Submarine = require('./Submarine.js')
const Destructor = require('./Destructor')
const Cannon = require('./Cannon.js')
const Torpedo = require('./Torpedo.js')
const Difficulty = require('./Difficulty.js')

class Games {


    /*Constructor*/
    constructor() {
        this.gameList = [];
        
        //singleton de la clase
        if(typeof Games.instance === "object") {
            return Games.instance;
        }
        Games.instance=this;
        return this;
    }

    getGameList() {
        return this.gameList;
    }

    createGame(name, bandoBarcos, socketId,mapa,difficulty) {
        if (bandoBarcos === 'submarino') {
            //obtengo coordenadas del submarino y lo creo
            // esta linea la cambiaria -- >var coordenadas = this.coordenadasSubmarino();
            var elSubmarino = new Submarine();
            //creo la lista de botes y agrego al submarino
            var boatList = [elSubmarino];
            //creo el jugador
            var player = new Player(name, socketId, boatList);
            //creo la lista de jugadores de la partida
            var playerList = [];
            //agrego al jugador a la lista de jugadores
            playerList.push(player);
            //creo la partida
            var match = new Game(playerList, mapa, difficulty);
            //inserta al final del array
            this.gameList.push(match);

        } else {
            /*
            var elDestructor = new Destructor();
            //falta crear los cargueros y agregarlos a la lista de botes

            //creo el jugador
            var player = new Player(name, socketId, boatList);
            //creo la lista de botes y agrego al al destructor y los cargueros
            var boatList = [elSubmarino, cargeroA, cargeroB, cargeroC, cargeroD, cargeroE, cargeroF];
            //creo el jugador
            var player = new Player(name, socketId, boatList);
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
            this.gameList.push(match);
            */
        }

        //creo la lista de botes y se la asigno al jugadores

        //return this.gameList;

    }

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
            var coordenadas = this.coordenadasCargueros();
            var elDestructor = new Destructor(coordenadas);
            //falta crear los cargueros y agregarlos a la lista de botes

            //creo la lista de botes y agrego al al destructor y los cargueros
            var boatList = [elSubmarino, cargeroA, cargeroB, cargeroC, cargeroD, cargeroE, cargeroF];
            //creo el jugador
            var player2 = new Player(name, socketId, boatList);
        }

        //creo la lista de botes y se la asigno al jugadores



    }



    saveGame(String) {
        //guarda la partida 
    }

    laodGame() {
        //carga la partida
    }




    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasCargueros() {

        /// cordenadas del mapa inicial es  width: 800,    height: 600,
        var xTotal = 800;
        var yTotal = 600;
        var mapaMitad = xTotal / 2;
        var listaCoordenadas = [];


        coordenada = {
            "x": Math.random() * (mapaMitad - 0) + 0,
            "y": Math.random() * (yTotal - 0) + 0
        };
        listaCoordenadas.push(coordenada);
        for (var i = 0; i < 5; i++) {
            if (i < 3) {
                coordenada.y = y + 10;
            } else {
                if (i == 3) {
                    coordenada.x = x + 10;
                }
                coordenada.y = y + 10;
            }
            listaCoordenadas.push(coordenada);
        }
        var noEsIgual = false;
        var contador = 0;
        while (!esIgual) {
            coordenada.x = Math.random() * (mapaMitad - 0) + 0;
            coordenada.y = Math.random() * (yTotal - 0) + 0;
        };
        for (var j = 0; j < listaCoordenadas.length; j++) {
            if ((coordenada.x == listaCoordenadas[j].x && coordenada.y == listaCoordenadas[j].y)) {
                contador++;
            }
        }
        if (contador == 6) {
            noEsIgual = true;
            listaCoordenadas.push(coordenada);
        } else {
            contador = 0;
        }
        return listaCoordenadas;
    }







}

module.exports = Games;