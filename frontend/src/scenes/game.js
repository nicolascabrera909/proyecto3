//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero from "../objects/carguero.js";
import Destructor from "../objects/destructor.js";
import Map from "../objects/map.js";

class Game extends Phaser.Scene {
  /*Constructor de la clase Game, inicializo la clase*/
  constructor() {
    super('Game');
    console.log("Game cargado");
    this.cant_torpedos_enviados = 0;
    this.cant_canones_enviados = 0;
    this.cant_cargas_enviadas = 0;
    this.games = null;
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.username = '';
    this.timedEvent;
    this.input;
    this.initialTime;
    this.FreightersList = [];
  }

  preload() {
    this.load.image('destructor', './static/assets/img/destructor_small.png');
    this.load.image('submarino', './static/assets/img/submarino_small.png');
    this.load.image('carguero', './static/assets/img/freighters_small.png');
    this.load.image('torpedo', './static/assets/img/torpedo.png');
    this.load.image('canon', './static/assets/img/cannon.png');
    this.load.image('tiles', './static/assets/map/terrain.png');
    this.load.image('depth_charge', './static/assets/img/depthcharge.png')
    this.load.image('logo', './static/assets/img/logo.jpeg');
    this.load.tilemapTiledJSON('map', './static/assets/map/map.json');

  }

  create() {
    var self = this
    this.socket = io("http://localhost:3000")
    this.otherPlayers = this.physics.add.group();
    this.otherPlayersCargueros = this.physics.add.group();
    this.physics.add.collider(this.otherPlayers, this.otherPlayersCargueros);

    console.log('Obtengo datos pre-game.html');
    var username = this.urlParams.get('username');
    var boatType = this.urlParams.get('boattype');
    var difficulty = this.urlParams.get('dificultad');
    this.username = username;

    this.socket.on('inicioInstancia', (backGame) => {
      console.log('Evento inicioInstancia');
      this.games = backGame;
      console.log('Emito createGame');
      this.socket.emit('createGame', username, boatType, difficulty);
    });

    this.socket.on('currentPlayers', (players) => {
      for (let i = 0; i < players.length; i++) { 
        if (players[i].socketId === this.socket.id) {
          this.addPlayer(this, players[i])
        } else {
          this.addOtherPlayers(this, players[i])
        }
      }

      if (this.destructor) {
        this.physics.add.overlap(this.destructor.destructor,  this.submarino2.submarino, () => 
        this.choque(this.destructor,  this.submarino2)
        );
      }
      
      window.game = this;
    });

    this.socket.on('newPlayer', (playerInfo) => {
      this.addOtherPlayers(this, playerInfo);
      if (this.submarino) {
        this.physics.add.overlap(this.submarino.submarino,  this.destructor2.destructor, () => 
        this.choque(this.submarino,  this.destructor2)
        );
      }
    });

    this.socket.on('playerDisconnected', (playerId) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy()
        }
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.socket.on('playerMoved', (playerInfo) => {

      let i = 0;
      this.otherPlayers.getChildren().forEach( (otherPlayer) => {
        if (playerInfo.socketId === otherPlayer.socketId) {
          otherPlayer.setRotation(playerInfo.boatList[i].rotation)
          otherPlayer.setPosition(playerInfo.boatList[i].positionX, playerInfo.boatList[i].positionY)
        }
        i++;
      });
    });

    this.socket.on('playerMovedCarguero', (playerInfo) => {

      let i = 0;
      if (playerInfo.boatList[i].type == 'destructor') {
        i = 1;
      }

      this.otherPlayersCargueros.getChildren().forEach((otherPlayersCargueros) => {
        if (playerInfo.socketId === otherPlayersCargueros.socketId) {
          if (playerInfo.boatList[i].type == 'carguero') {
            otherPlayersCargueros.setPosition(playerInfo.boatList[i].positionX, playerInfo.boatList[i].positionY)
          }
        }
        i++;
      });
    });

    this.socket.on('other_destroy_submarino', (info) => {
      this.submarino2.destroy();
    });

    this.socket.on('other_destroy_destructor', (info) => {
      this.destructor.destroy();
    });

    this.socket.on('other_shot', (info) => {
      this.submarino2.shootTorpedo();
    });

    this.socket.on('other_shotCannon', (info) => {
      this.submarino2.shootCannon();
    });

    this.socket.on('other_shotCannonDestructor', (info) => {
      this.destructor2.shootCannon();
    });

    this.socket.on('other_shotDepthCharge', (info) => {
      this.destructor2.shootDepthCharge();
    });

    this.socket.on('other_surface', (info) => {
      console.log('submarino en superficie');
      this.submarino2.surfaceOpponent();
    });

    this.socket.on('other_immerse', (info) => {
      console.log('submarino sumergido');
      this.submarino2.immerseOpponent();
    });

    this.socket.on('other_deepImmerse', (info) => {
      console.log('submarino sumergido profundo');
      this.submarino2.deepImmerseOpponent(info);
    });

    this.map = new Map(this, 'map', 'tiles', 'terrain');
  }

  choque(nave1, nave2) {
    nave1.destroy(this.socket);
    nave2.destroy(this.socket);
  }

  addPlayer(self, playerInfo) {
    console.log(playerInfo)
    if (playerInfo.boatTeam == 'submarino') {
      //Creo submarino
      console.log('Dibujo submarino')
      var coordS = {
        x: playerInfo.boatList[0].positionX,
        y: playerInfo.boatList[0].positionY,
      }
      this.submarino = new Submarino(self, 0, 0, 'submarino');
      this.submarino.create(coordS, self, true);
      console.log('pos inicial submarino x:' + coordS.x + 'y:' + coordS.y + ' rotacion:' + this.submarino.rotation);
    } else {
      //Creo destructor y cargueros
      this.destructor = new Destructor(self, 0, 0, 'destructor');
      let id = 0;
      for (let i = 0; i < playerInfo.boatList.length; i++) {
        if (playerInfo.boatList[i].type == 'destructor') {
          console.log('Dibujo Destructor');
          var coordD = {
            x: playerInfo.boatList[i].positionX,
            y: playerInfo.boatList[i].positionY,
          };
          this.destructor.create(coordD, self, true);
          console.log('pos inicial destructor x:' + coordD.x + 'y:' + coordD.y + ' rotacion:' + this.destructor.rotation);
        } else {
          console.log('Dibujo carguero');
          id++;
          this.carguero = new Carguero(self, 0, 0, 'carguero', id);
          this.FreightersList.push(this.carguero);
          this.carguero.create(playerInfo.boatList[i])
        }
      }
    }
  }

  addOtherPlayers(self, playerInfo) {
    if (playerInfo.boatTeam == 'destructor') {
      this.destructor2 = new Destructor(self, 0, 0, 'destructor');

      for (let i = 0; i < playerInfo.boatList.length; i++) {
        let otherPlayer = null;
        let otherPlayersCarguero = null;
        if (playerInfo.boatList[i].type == 'destructor') {
          console.log('Dibujo Destructor secundario');
          var coordD2 = {
            x: playerInfo.boatList[i].positionX,
            y: playerInfo.boatList[i].positionY,
          };
          otherPlayer = this.destructor2.create(coordD2, self, false);
          otherPlayer.socketId = playerInfo.socketId;
          this.otherPlayers.add(otherPlayer);
          
          console.log('creo other player destructor')
        
        } else {
          console.log('Dibujo carguero secundario');
          this.carguero2 = new Carguero(self, 0, 0, 'carguero');
          otherPlayersCarguero = this.carguero2.create(playerInfo.boatList[i]);
          otherPlayersCarguero.socketId = playerInfo.socketId;
          this.otherPlayersCargueros.add(otherPlayersCarguero);
          console.log('creo other player destructor');
        }
      }

    } else {
      let otherPlayer = null;
      console.log('Dibujo submarino  secundario')
      var coordS2 = {
        x: playerInfo.boatList[0].positionX,
        y: playerInfo.boatList[0].positionY,
      }
      this.submarino2 = new Submarino(self, 0, 0, 'submarino');
      otherPlayer = this.submarino2.create(coordS2, self, false);
      otherPlayer.socketId = playerInfo.socketId;
      this.otherPlayers.add(otherPlayer)


      console.log('creo other player submarino')
    }

  }

  update() {
    if (this.submarino !== undefined) {
      this.submarino.moveSubmarino(this.cursors, this.socket, this.input, self);
    }

    if (this.destructor) {
      this.destructor.moveDestructor(this.cursors, this.socket);
    }
    for (let i = 0; i < this.FreightersList.length; i++) {
      if (this.FreightersList[i] !== undefined) {
        this.FreightersList[i].moveCarguero(this.socket);
      }
    }
    
  }
}

export default Game;