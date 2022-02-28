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
    this.load.image('destructor', './static/assets/img/destructor.png');
    this.load.image('submarino', './static/assets/img/submarino.png');
    this.load.image('carguero', './static/assets/img/freighters.png');
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
    this.otherPlayers = this.physics.add.group()

    console.log('Obtengo datos pre-game.html');
    var username = this.urlParams.get('username');
    var boatType = this.urlParams.get('boattype');
    var difficulty = this.urlParams.get('dificultad');
    this.username = username;

    this.socket.on('inicioInstancia', function (backGame) {
      console.log('Evento inicioInstancia');
      this.games = backGame;
      console.log('Emito createGame');
      self.socket.emit('createGame', username, boatType, difficulty);
      //this.listenForSocketEvents(self);

    });

    this.socket.on('currentPlayers', function (players) {
      /* Object.keys(players).forEach(function (id) {
         if (players[id].playerId === self.socket.id) {
           self.addPlayer(self, players[id])
         } else {
           self.addOtherPlayers(self, players[id])
         }
       })*/
      for (let i = 0; i < players.length; i++) {
        if (players[i].socketId === self.socket.id) {
          self.addPlayer(self, players[i])
        } else {
          self.addOtherPlayers(self, players[i])
        }
      }


    })

    this.socket.on('newPlayer', function (playerInfo) {
      self.addOtherPlayers(self, playerInfo)
    })

    this.socket.on('playerDisconnected', function (playerId) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy()
        }
      })
    })

    this.cursors = this.input.keyboard.createCursorKeys();
    this.socket.on('playerMoved', function (playerInfo) {
      /*self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        /*if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setRotation(playerInfo.rotation)
          otherPlayer.setPosition(playerInfo.x, playerInfo.y)
        }*/
        for(let i=0;i<self.otherPlayers.children.entries.length;i++){
          if (playerInfo.socketId == self.otherPlayers.children.entries[i].socketId) {
            for (let j = 0; j < playerInfo.boatList.length; j++) {
              if (! (self.otherPlayers.children.entries[i].texture.key == 'carguero')) {
                if (self.otherPlayers.children.entries[i].texture.key == playerInfo.boatList[j].type) {
                  console.log('muevo ' + self.otherPlayers.children.entries[i].texture.key)
                  //self.otherPlayers.children.entries[i].setRotation(playerInfo.boatList[j].rotation);
                  //self.otherPlayers.children.entries[i].setPosition(playerInfo.boatList[j].positionX, playerInfo.boatList[j].positionY);
                  self.otherPlayers.children.entries[i].rotation=playerInfo.boatList[j].rotation;
                  self.otherPlayers.children.entries[i].x=playerInfo.boatList[j].positionX;
                  self.otherPlayers.children.entries[i].y=playerInfo.boatList[j].positionY;
                  console.log('pos '+self.otherPlayers.children.entries[i].texture.key +' x  ' +self.otherPlayers.children.entries[i].x+' y '+self.otherPlayers.children.entries[i].y +' '+self.otherPlayers.children.entries[i].rotation);
                }
              }
            }
          }
        }
       /* self.otherPlayers.getChildren().getEntries().forEach(function (otherPlayer) {
          if (playerInfo.socketId == otherPlayer.socketId) {
            for (let i = 0; i < playerInfo.boatList.length; i++) {
              if (!otherPlayer.texture.key == 'carguero') {
                if (otherPlayer.texture.key == playerInfo.boatList[i].type) {
                  console.log('muevo ' + otherPlayer.texture.key)
                  otherPlayer.setRotation(playerInfo.boatList[i].rotation);
                  otherPlayer.setPosition(playerInfo.boatList[i].positionX, playerInfo.boatList[i].positionY);
                }
              }
            }
          }
        });*/
      
    });

    this.map = new Map(this, 'map', 'tiles', 'terrain');
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
      console.log('pos inicial submarino x:'+coordS.x+ 'y:'+ coordS.y+' rotacion:'+this.submarino.rotation);

    } else {
      //Creo destructor y cargueros
      this.destructor = new Destructor(self, 0, 0, 'destructor');
      this.carguero = new Carguero(self, 0, 0, 'carguero');
      for (let i = 0; i < playerInfo.boatList.length; i++) {
        if (playerInfo.boatList[i].type == 'destructor') {
          console.log('Dibujo Destructor');
          var coordD = {
            x: playerInfo.boatList[i].positionX,
            y: playerInfo.boatList[i].positionY,
          };
          this.destructor.create(coordD, self, true);
          console.log('pos inicial destructor x:'+coordD.x+ 'y:'+ coordD.y+' rotacion:'+this.destructor.rotation);
        }/* else {
          console.log('Dibujo carguero');
          this.carguero.create(playerInfo.boatList[i]);
          this.FreightersList.add(this.carguero);
        }*/
      }
    }
  }

  addOtherPlayers(self, playerInfo) {

    if (playerInfo.boatTeam == 'destructor') {
      /* otherPlayer = self.physics.add.image(playerInfo.boatList[0].positionX, playerInfo.boatList[0].positionY, 'destructor')
         .setDisplaySize(180, 30)
         .setRotation(playerInfo.rotation)*/
      this.destructor2 = new Destructor(self, 0, 0, 'destructor');
      this.carguero2 = new Carguero(self, 0, 0, 'carguero');
      for (let i = 0; i < playerInfo.boatList.length; i++) {
        let otherPlayer = null;
        if (playerInfo.boatList[i].type == 'destructor') {
          console.log('Dibujo Destructor secundario');
          var coordD2 = {
            x: playerInfo.boatList[i].positionX,
            y: playerInfo.boatList[i].positionY,
          };
          otherPlayer = this.destructor2.create(coordD2, self, false);
          otherPlayer.socketId = playerInfo.socketId;
          self.otherPlayers.add(otherPlayer)
          console.log('creo other player destructor')
        } /*else {
          console.log('Dibujo carguero secundario');
          otherPlayer = this.carguero2.create(playerInfo.boatList[i]);
          otherPlayer.socketId = playerInfo.socketId;
          self.otherPlayers.add(otherPlayer)
          console.log('creo other player destructor')
        }*/
      }

    } else {
      let otherPlayer = null;
      /*otherPlayer = self.physics.add.image(playerInfo.x, playerInfo.y, 'submarino')
        .setDisplaySize(180, 30)
        .setRotation(playerInfo.rotation)*/
      console.log('Dibujo submarino  secundario')
      var coordS2 = {
        x: playerInfo.boatList[0].positionX,
        y: playerInfo.boatList[0].positionY,
      }
      this.submarino2 = new Submarino(self, 0, 0, 'submarino');
      otherPlayer = this.submarino2.create(coordS2, self, false);
      otherPlayer.socketId = playerInfo.socketId;
      self.otherPlayers.add(otherPlayer)
      console.log('creo other player submarino')
    }

  }

  update() {
    if (this.submarino !== undefined) {
      this.submarino.moveSubmarino(this.cursors, this.socket);
    }

    if (this.destructor !== undefined) {
      this.destructor.moveDestructor(this.cursors, this.socket);
    }

    /*if (this.submarino !== undefined) {
      this.submarino.moveSubmarino(this.cursors, this.socket);
    }*/
  }
}

export default Game;