//importo las clases que necesito
const Player = require('./Player.js')
const Game = require('./Game.js')
const Submarine = require('./Submarine.js')
const Destructor = require('./Destructor')
const Freighters = require('./Freighters.js')
const Map = require('./Map.js')
const DAOGame = require('../data/DAOGame.js')
const DAOMap = require('../data/DAOMap.js')
const DAOPLayer = require('../data/DAOPLayer.js')
const DAOShip = require('../data/DAOShip.js')
const DAODestructor = require('../data/DAODestructor.js')
const DAOSubmarine = require('../data/DAOSubmarine.js')
const DAOCannon = require('../data/DAOCannon.js')
const DAOTorpedo = require('../data/DAOTorpedo.js')
const DAODepthCharge = require('../data/DAODepthCharge.js')
const DAODifficulty = require('../data/DAODifficulty.js')

//const { prependListener } = require('../data/Database.js')

class Games {
    /*Constructor*/
    constructor() {
        this.game = null;
        this.map = new Map();
        const daoGame = new DAOGame();
        const daoPlayer = new DAOPLayer();
        const daoMap = new DAOMap();
        const daoShip = new DAOShip();
        const daoDestructor = new DAODestructor();
        const daoSubmarine = new DAOSubmarine();
        const daoCannon = new DAOCannon();
        const daoTorpedo = new DAOTorpedo();
        const daoDepthCharge = new DAODepthCharge();
        const daoDifficulty = new DAODifficulty();

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

    createGame(socketId, name, boatTeam, difficulty) {
        if (boatTeam == 'submarino') {
            console.log("*************submarino*************");
            let boatList = this.logicaSubmarino(this.map);
            var player = new Player(name, socketId, boatList, boatTeam);

            //valido si hay que crear la partida o agregar a una existente
            if (this.game == null) {
                this.partidaNueva(player, difficulty)
            } else {
                this.partidaExistente(player)
            }
        } else {
            console.log("++++++++++DESTRUCTOR++++++++++");
            var coordenadaAux = {
                "x": 0,
                "y": 0
            };
            var aux = new Freighters(coordenadaAux);
            //falta crear los cargueros y agregarlos a la lista de botes
            var listaCoordendas = aux.coordenadasCargueros(this.map.width, this.map.height);
            var FreightersA = new Freighters(listaCoordendas[0], 1);
            var FreightersB = new Freighters(listaCoordendas[1], 2);
            var FreightersC = new Freighters(listaCoordendas[2], 3);
            var FreightersD = new Freighters(listaCoordendas[3], 4);
            var FreightersE = new Freighters(listaCoordendas[4], 5);
            var FreightersF = new Freighters(listaCoordendas[5], 6);

            var theDestructor = new Destructor(difficulty);

            theDestructor.coordenadas(listaCoordendas);
            //creo la lista de botes y agrego al al destructor y los cargueros
            let boatList2 = [theDestructor, FreightersA, FreightersB, FreightersC, FreightersD, FreightersE, FreightersF];
            let player2 = new Player(name, socketId, boatList2, boatTeam);
            console.log("termine de crear al jugador, valido si existe partida");
            if (this.game == null) {
                this.partidaNueva(player2, difficulty);
            } else {
                this.partidaExistente(player2);
            }
        }
    }

    deletePlayer(socketId) {
        //busco el indice del arreglo del
        var i = 0;
        var encontre = false;
        var pos = 0;
        if (!(this.game == null)) {

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

    LoadGame() {


        /*this.game = new Game(aDifficulty.id)  //constructor(playerList, idDifficulty)
        constructor(playerList) 
        player constructor(name, socketId, boatList, boatTeam)
        destructor-- > cannon y carga profundidad-- > cannon  CantMunicion(30), carga profundidad  CantMunicion
        submarino x, y  this.boatLife    this.visibility  this.depth  rotation  this.type = 'submarino'; ->
            torpedo CantMunicion, cannon - CantMunicion
        carguero -> x, y  this.boatLife    this.visibility    rotation  this.type = 'destructor'
                    carga profundida CantMunicion, cannon - CantMunicion*/

        this.torpedo = new Torpedo();
        this.cannon = new Cannon(30);

        let listGames = await daoGame.find();
        if (this.existPartidaPlayers(listGames, name1, name2)) {
            //busco el juego
            let aGame = findPartidaPlayers(listGames);
            //busco la dificultad
            let aDifficulty = daoDifficulty.find(aGame.difficulty_id);
            //obtengo los players del juego
            let pleyerList = daoPlayer.find(theGame.id);
            //obtengo ships
            for (let i = 0; i < pleyerList.length; i++) {
                let shipList = daoShip.find(pleyerList[i].id);
                for (let j = 0; j < shipList.length; j++) {
                    //me fijo de que tipo es 
                    switch (shipList[j].boatType) {
                        case 'submarino':

                            break;
                        case 'destructor':

                            break;
                        case 'carguero':

                            break;
                    }
                    let dao
                }

            }

        } else {
            console.log('no existe la partida');
        }
    }

    //guardo la partida
    async saveGame(name1, name2, difficulty) {
        let listGames = await daoGame.find();
        if (this.existPartidaPlayers(listGames, name1, name2)) {
            //tengo q actualizar lo guardado

            // falta

        } else {
            //Guardo por primera vez
            //inserto el game, con dificultad 1. cuando tenga va difficulty
            daoGame.insert(1);
            let ultimoId = await daoGame.lastGame()
            //inserto mapa [gameId, map.heigth,map.width]
            daoMap.insert(ultimoId, this.map)
            //inserto player [gameId, player.name]
            for (let i = 0; i < this.game.playerList.length; i++) {
                daoPlayer.insert(ultimoId, this.game.playerList[0]);
                //inserto ship ---> valido de q tipo es   destructor, submarino. [playerId, ship.positionX,ship.positionY,ship.boatLife,ship.boatType,ship.visibility]
                let ultimoIdPLayer = await daoPlayer.lastPlayerId(ultimoId)
                for (let j = 0; j < this.game.playerList[i].boatList.length; j++) {
                    daoShip.insert(ultimoId, this.game.playerList[i].boatList[j]);
                    let ultimoShip = daoShip.lastShipId(ultimoIdPLayer);
                    //Busco q tipo de barco es para insertar. 
                    switch (this.game.playerList[i].boatList[j].type) {
                        case 'submarino':
                            //shipId,submarine
                            daoSubmarine.insert(ultimoShip, this.game.playerList[i].boatList[j]);
                            //inserto armamaneto de submarino --idSubmarin,torpedo  ---shipId,cannon---
                            daoCannon.insert(ultimoShip, this.game.playerList[i].boatList[j].cannon);
                            let ultimoSubmarin = daoSubmarine.lastSubmarineId(ultimoShip);
                            daoTorpedo.insert(ultimoSubmarin, this.game.playerList[i].boatList[j].torpedo);
                            break;
                        case 'destructor':
                            //[shipId]
                            daoDestructor.insert(ultimoShip);
                            //inserto armamaneto de submarino--- idDestructor,depthCharge ---
                            daoCannon.insert(ultimoShip, this.game.playerList[i].boatList[j].cannon);
                            let ultimoDestructor = daoDestructor.lastDestructorId(ultimoShip);
                            daoDepthCharge.insert(ultimoDestructor, this.game.playerList[i].boatList[j].carga)
                            break;
                    }
                }
            }
        }
    }

    //devuelve si existe el jugador
    async existPartidaPlayers(listGames, name1, name2) {
        let i = 0;
        let encontre = false;

        while (i < listGames.length && !encontre) {
            let resultSql = await daoPlayer.find(listGames[i]);
            if (resultSql != 'Error') {
                let contadorIgual = 0;
                for (let j = 0; j < resultSql.length; j++) {
                    if ((resultSql[j].name == name1) || (resultSql[j].name == name2)) {
                        contadorIgual++;
                    }
                }
                if (contadorIgual == 2) {
                    encontre = true;
                }
            }
            i++;
        }
        return encontre;
    }
    //devuelve los jugadores
    async findPartidaPlayers(listGames, name1, name2) {
        let i = 0;
        let encontre = false;
        let gamePleyers = null;

        while (i < listGames.length && !encontre) {
            let resultSql = await daoPlayer.find(listGames[i].id);
            if (resultSql != 'Error') {
                let contadorIgual = 0;
                for (let j = 0; j < resultSql.length; j++) {
                    if ((resultSql[j].name == name1) || (resultSql[j].name == name2)) {
                        contadorIgual++;
                    }
                }
                if (contadorIgual == 2) {
                    encontre = true;
                    gamePleyers = listGames[i];
                } else {
                    gamePleyers = null;
                }
            }
            i++;
        }
        return gameId;
    }


    whoWins() {
        let deathSubmarine = false;
        let arriveFreighters = 0;
        let deathFreighters = 0;
        let winnerPlayer = 'empate';
        let positionXFinal = this.map.width;
        let socketSubmarine;
        let socketDestructor;

        /* La partida es ganada por un equipo cuando:
        --Gana-->
        -el destructor destruyó al submarino;
         -el submrino destruye al menos 4 cargueros
        - la mitad de cargueros llega al otro lado del mapa;
         -por cancelación de partida, considerando perdedor a quien cancela y gana su rival--> eso se hace en la scena del game
        --Empte-->
             - por tiempo y no cumplo condicion de ganar*/


        for (let i = 0; i < this.game.playerList.length; i++) {
            for (let j = 0; j < this.game.playerList[i].boatList.length; j++) {
                if (this.game.playerList[i].boatTeam = 'submarino') {
                    socketSubmarine = this.game.playerList[i].socketId;
                    //validos si el submarino esta vivo
                    if (this.game.playerList[i].boatList[j].boatLife == 0) {
                        deathSubmarine = true;
                    }
                } else {
                    socketDestructor = this.game.playerList[i].socketId;
                    //evaluo cuantos cargueros estan vivos y si alguno llego a destino
                    if (this.game.playerList[i].boatList[j].type == 'carguero') {
                        if (this.game.playerList[i].boatList[j].boatLife > 0) {
                            if (this.game.playerList[i].boatList[j].positionX == positionXFinal) {
                                arriveFreighters++;
                            }
                        } else {
                            deathFreighters++;
                        }
                    }
                }
            }
        }
        //murieron mas de tres cargueros y el submarino esta vivo
        if (deathFreighters > 3 && (!deathSubmarine)) {
            winnerPlayer = socketSubmarine;
        }
        //Llegaron 3 o mas cargeros
        if (arriveFreighters > 2) {
            winnerPlayer = socketDestructor;
        }
        //Llegaron 3 o mas cargeros
        if (arriveFreighters > 2) {
            winnerPlayer = socketDestructor;
        }









        return winnerPlayer;

    }

}

module.exports = Games;