//importo las clases que necesito
const Player = require('./Player.js')
const Players = require('./Players.js')
const Game = require('./Game.js')
const Submarine = require('./Submarine.js')
const Destructor = require('./Destructor.js')
const Freighters = require('./Freighters.js')
const Torpedo = require('./Torpedo.js')
const Cannon = require('./Cannon.js')
const DepthCharge = require('./DepthCharge.js')
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
const DAOFreighters = require('../data/DAOFreighters.js')
//const { prependListener } = require('../data/Database.js')

class Games {
    /*Constructor*/
    constructor() {
        this.game = null;
        this.map = new Map();
        this.daoGame = new DAOGame();
        this.daoPlayer = new DAOPLayer();
        this.daoMap = new DAOMap();
        this.daoShip = new DAOShip();
        this.daoDestructor = new DAODestructor();
        this.daoSubmarine = new DAOSubmarine();
        this.daoCannon = new DAOCannon();
        this.daoTorpedo = new DAOTorpedo();
        this.daoDepthCharge = new DAODepthCharge();
        this.daoDifficulty = new DAODifficulty();
        this.daoFreighters = new DAOFreighters();
        this.charge = false;
        this.cancel=false;


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
            let boatList = this.logicaSubmarino(this.map);
            var player = new Player(name, socketId, boatList, boatTeam);
            //valido si hay que crear la partida o agregar a una existente
            if (this.game == null) {
                this.partidaNueva(player, difficulty)
            } else {
                this.partidaExistente(player)
            }
        } else {
            var coordenadaAux = {
                "x": 0,
                "y": 0
            };
            var aux = new Freighters(coordenadaAux);
            var listaCoordendas = aux.coordenadasCargueros(this.map.width, this.map.height);
            //Creo los cargueros
            var FreightersA = new Freighters(listaCoordendas[0], 1);
            var FreightersB = new Freighters(listaCoordendas[1], 2);
            var FreightersC = new Freighters(listaCoordendas[2], 3);
            var FreightersD = new Freighters(listaCoordendas[3], 4);
            var FreightersE = new Freighters(listaCoordendas[4], 5);
            var FreightersF = new Freighters(listaCoordendas[5], 6);

            var theDestructor = new Destructor(difficulty);

            theDestructor.coordenadas(listaCoordendas);
            //Creo la lista de botes y agrego al destructor y los cargueros
            let boatList2 = [theDestructor, FreightersA, FreightersB, FreightersC, FreightersD, FreightersE, FreightersF];
            let player2 = new Player(name, socketId, boatList2, boatTeam);
            //Termino de crear al jugador, valido si existe partida
            if (this.game == null) {
                this.partidaNueva(player2, difficulty);
            } else {
                this.partidaExistente(player2);
            }
        }
        return this.game;
    }

    deletePlayer(socketId) {
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
        if(this.game.playerList.length==0){
            this.game=null;
        }
    }

    async LoadGame(gameId) {


        let boatListSubmarino = [];
        let boatListDestructor = [];
        let submarinePlayer = null;
        let destructorPlayer = null;
        let theGame = new Game();

        //busco el juego
        let aGame = await this.daoGame.findGameId(gameId);
        //busco el mapa 
        let map = await this.daoMap.find(gameId);          //busco la dificultad
        let aDifficulty = await this.daoDifficulty.find(aGame.difficulty_id);
        //obtengo los players del juego
        let pleyerList = await this.daoPlayer.find(gameId);
        //obtengo ships
        for (let i = 0; i < pleyerList.length; i++) {
            let shipList = await this.daoShip.find(pleyerList[i].id);
            for (let j = 0; j < shipList.length; j++) {
                //me fijo de que tipo es 
                switch (shipList[j].boatTeam) {
                    case 'submarino':
                        let aSubmarino = await this.daoSubmarine.find(shipList[j].id);
                        let aTorpedo = await this.daoTorpedo.find(aSubmarino.id);
                        let aCannon = await this.daoCannon.find(shipList[j].id);
                        //hago los new del armamanto
                        let cannonS = new Cannon(aCannon.c_cantidad);
                        let torpedoS = new Torpedo(aTorpedo.t_cantidad);
                        //hago el new de submarino y lo agreo a una lista
                        let submarine = new Submarine(map);
                        submarine.torpedo = torpedoS;
                        submarine.cannon = cannonS;
                        submarine.positionX = shipList[j].positionX;
                        submarine.positionY = shipList[j].positionY;
                        submarine.rotation = shipList[j].rotation;
                        submarine.boatLife = shipList[j].boatLife;
                        submarine.visibility = shipList[j].visibility;
                        //submarine.type = shipList[j].boatType;
                        //submarine.depth = aSubmarino.s_depth;
                        boatListSubmarino.push(submarine);
                        submarinePlayer = new Player(pleyerList[i].name, '0', boatListSubmarino, 'submarino');



                        break;
                    case 'destructor':
                        let bDestructor = await this.daoDestructor.find(shipList[j].id);
                        let cCarguero = await this.daoFreighters.find(shipList[j].id);

                        if (cCarguero == null) {
                            let bDepthCharge = await this.daoDepthCharge.find(bDestructor.id);
                            let bCannon = await this.daoCannon.find(shipList[j].id);
                            //hago los new del armamanto
                            let cannonD = new Cannon(bCannon.c_cantidad);
                            let depthChargeD = new DepthCharge(bDepthCharge.dp_time, bDepthCharge.dp_depth);
                            //hago el new de destructor y lo agreo a una lista
                            let destructor = new Destructor();
                            destructor.carga = depthChargeD;
                            destructor.cannon = cannonD;
                            destructor.positionX = shipList[j].positionX;
                            destructor.positionY = shipList[j].positionY;
                            destructor.rotation = shipList[j].rotation;
                            destructor.visibility = shipList[j].visibility;
                           // destructor.type = shipList[j].boatType;
                            boatListDestructor.push(destructor);
                            if (j + 1 == shipList.length) {
                                destructorPlayer = new Player(pleyerList[i].name, '0', boatListDestructor, 'destructor');
                            }

                        } else {
                            // 'carguero':
                            //hago el new de destructor y lo agreo a una lista
                            let coordenadas = {
                                "x": shipList[j].positionX,
                                "y": shipList[j].positionY
                            };
                            let freighters = new Freighters(coordenadas, cCarguero.id);//coordenadas,id
                            //freighters.positionX = shipList[j].positionX;
                            //freighters.positionY = shipList[j].positionY;
                            freighters.visibility = shipList[j].visibility;
                            //freighters.type = shipList[j].boatType;
                            //freighters.id = cCarguero.id;
                            boatListDestructor.push(freighters);
                            if (j + 1 == shipList.length) {
                                destructorPlayer = new Player(pleyerList[i].name, '0', boatListDestructor, 'destructor');
                            }
                        }

                        break;

                }
            }
            //agrego el jugador de destructor con los cargeros

        }
      
        let lista = [submarinePlayer, destructorPlayer]
        let dificultad=0;
        switch(aDifficulty.id){
            case 1:dificultad="1";
            break;
            case 2:dificultad="2";
            break;
            case 3:dificultad="3";
            break;
        }
        

       
        this.game = new Game(lista, dificultad)
     
        return 'ok';
    }

    //guardo la partida
    async saveGame() {
        let listGames = await this.daoGame.find();
        //obtengo name y dificultad
        let difficulty = this.game.idDifficulty;
        let name1 = this.game.playerList[0].name;
        let name2 = this.game.playerList[1].name;




        if (await this.existPartidaPlayers(listGames, name1, name2)) {
            let players;
            let currentPlayer;
            let ships;
            let submarineId;
            let destructorId;
            //tengo q actualizar lo guardado
            let gameId = await this.findPartidaPlayers(listGames, name1, name2);
            //actualizo mapa [gameId, map.heigth,map.width]
            await this.daoMap.update(gameId, this.map)
            players = await this.daoPlayer.find(gameId.id)
            for (let i = 0; i < players.length; i++) {
                if (this.game.playerList[0].name == players[i].name) {
                    currentPlayer = this.game.playerList[0];
                }
                else {
                    currentPlayer = this.game.playerList[1];
                }
                ships = await this.daoShip.find(players[i].id)
                for (let j = 0; j < ships.length; j++) {
                    //problemas con update
                    // await this.daoShip.update(ships[j].id, currentPlayer.boatList[j]);
                    console.log(await this.daoShip.update(ships[j].id, currentPlayer.boatList[j]));
                    if (currentPlayer.boatList[j].type == 'submarino' || currentPlayer.boatList[j].type == 'destructor') {
                        if (currentPlayer.boatList[j].type == 'submarino') {
                            submarineId = await this.daoSubmarine.find(ships[j].id)
                            await this.daoSubmarine.update(submarineId, currentPlayer.boatList[j].depth)
                            await this.daoTorpedo.update(submarineId, currentPlayer.boatList[j].torpedo.cantidad)
                        } else {
                            destructorId = await this.daoDestructor.find(ships[j].id)
                            await this.daoDepthCharge.update(destructorId, currentPlayer.boatList[j].carga)
                        }
                        await this.daoCannon.update(ships[j].id, currentPlayer.boatList[j].cannon)
                    }

                }
            }
        } else {
            //Guardo por primera vez
            //inserto el game, con dificultad 1. cuando tenga va difficulty
            await this.daoGame.insert(difficulty);
            let ultimoId = await this.daoGame.lastGame()
            //inserto mapa [gameId, map.heigth,map.width]
            await this.daoMap.insert(ultimoId, this.map)
            //inserto player [gameId, player.name]
            for (let i = 0; i < this.game.playerList.length; i++) {
                await this.daoPlayer.insert(ultimoId, this.game.playerList[i]);
                //inserto ship ---> valido de q tipo es   destructor, submarino. [playerId, ship.positionX,ship.positionY,ship.boatLife,ship.boatType,ship.visibility]
                let ultimoIdPLayer = await this.daoPlayer.lastPlayerId(ultimoId)
                for (let j = 0; j < this.game.playerList[i].boatList.length; j++) {
                    await this.daoShip.insert(ultimoIdPLayer, this.game.playerList[i].boatTeam, this.game.playerList[i].boatList[j]);
                    let ultimoShip = await this.daoShip.lastShipId(ultimoIdPLayer);
                    //Busco q tipo de barco es para insertar. 
                    switch (this.game.playerList[i].boatList[j].type) {
                        case 'submarino':
                            //shipId,submarine
                            await this.daoSubmarine.insert(ultimoShip, this.game.playerList[i].boatList[j]);
                            //inserto armamaneto de submarino --idSubmarin,torpedo  ---shipId,cannon---
                            await this.daoCannon.insert(ultimoShip, this.game.playerList[i].boatList[j].cannon);
                            let ultimoSubmarin = await this.daoSubmarine.lastSubmarineId(ultimoShip);
                            await this.daoTorpedo.insert(ultimoSubmarin, this.game.playerList[i].boatList[j].torpedo);
                            break;
                        case 'destructor':
                            //[shipId]
                            await this.daoDestructor.insert(ultimoShip, this.game.playerList[i].boatList[j].type);
                            //inserto armamaneto de submarino--- idDestructor,depthCharge ---
                            await this.daoCannon.insert(ultimoShip, this.game.playerList[i].boatList[j].cannon);
                            let ultimoDestructor = await this.daoDestructor.lastDestructorId(ultimoShip);
                            await this.daoDepthCharge.insert(ultimoDestructor, this.game.playerList[i].boatList[j].carga)
                            break;

                        case 'carguero':
                            await this.daoFreighters.insert(ultimoShip, this.game.playerList[i].boatList[j].type)
                            break;
                    }
                }
            }
        }
        return 'OK'
    }

    //devuelve si existe el jugador
    async existPartidaPlayers(listGames, name1, name2) {
        let i = 0;
        let encontre = false;

        while (i < listGames.length && !encontre) {
            let resultSql = await this.daoPlayer.find(listGames[i].id);
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
            let resultSql = await this.daoPlayer.find(listGames[i].id);
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
        return gamePleyers;
    }


    whoWins() {
        let arriveFreighters = 0;
        let winnerPlayer = 'empate';
        let positionXFinal = this.map.width;
        let socketDestructor;


        for (let i = 0; i < this.game.playerList.length; i++) {
            for (let j = 0; j < this.game.playerList[i].boatList.length; j++) {
                if (this.game.playerList[i].boatTeam = 'destructor') {
                    socketDestructor = this.game.playerList[i].socketId;
                    //evaluo cuantos cargueros estan vivos y si alguno llego a destino
                    if (this.game.playerList[i].boatList[j].type == 'carguero') {
                        if (this.game.playerList[i].boatList[j].positionX == positionXFinal) {
                            arriveFreighters++;
                        }

                    }
                }
            }
        }
        //Llegaron 3 o mas cargeros
        if (arriveFreighters > 2) {
            winnerPlayer = socketDestructor;
        }
        return winnerPlayer;
    }


    loading(cargada) {
        this.charge = cargada;
    }

    loadingRedy() {
        return this.charge;
    }

    espera(milisegundos) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
         if ((new Date().getTime() - start) > milisegundos) {
          break;
         }
        }
    }

    cancelo(seCancela){
        this.cancel=seCancela;
    }

    askCancel(){
       // this.espera(900);
        return this.cancel;
    }
}



module.exports = Games;