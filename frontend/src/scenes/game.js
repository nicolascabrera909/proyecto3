//imoprto archivos
import Submarino from "../objects/submarino.js";
// import Carguero from "../objects/carguero.js";
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
    this.games = {
      gameList: [],
    }
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.username = '';
    this.timedEvent;
    this.input;
    this.initialTime;
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

  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        self.addPlayer(self, players[id])
      } else {
        self.addOtherPlayers(self, players[id])
      }
    })
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

  this.cursors = this.input.keyboard.createCursorKeys()

  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation)
        otherPlayer.setPosition(playerInfo.x, playerInfo.y)
      }
    })
  })

  this.map = new Map(this, 'map', 'tiles', 'terrain');
}

addPlayer(self, playerInfo) {
  console.log(playerInfo.cant)
  console.log(playerInfo.boat)
  if(playerInfo.cant==0){
    //Creo submarino
    playerInfo.boat='submarino'
    console.log(playerInfo.boat)

    var coordinates = {
       x: 30,
       y: 30,
    }

    this.submarino = new Submarino(self, 0, 0, 'submarino');
    this.submarino.create(coordinates, self, true);
    
  } else {
    //Creo destructor
    playerInfo.boat='destructor'
    console.log(playerInfo.boat)

    var coordinates = {
      x: 60,
      y: 60,
    }

    this.destructor = new Destructor(self, 0, 0, 'destructor');
    this.destructor.create(coordinates, self, true);
    }
  }

addOtherPlayers(self, playerInfo) {
    var otherPlayer=null;
    if(playerInfo.cant==1){
    otherPlayer=self.physics.add.image(playerInfo.x, playerInfo.y, 'destructor')
    .setDisplaySize(180, 30)
    .setRotation(playerInfo.rotation)
    } else {
    otherPlayer=self.physics.add.image(playerInfo.x, playerInfo.y, 'submarino')
    .setDisplaySize(180, 30)
    .setRotation(playerInfo.rotation)
    }
    otherPlayer.playerId = playerInfo.playerId
    self.otherPlayers.add(otherPlayer)
    console.log('creo other player destructor')
}

update() {
  if (this.submarino !== undefined) {
    this.submarino.moveSubmarino(this.cursors,this.socket);
  }

  if (this.destructor !== undefined) {
    this.destructor.moveDestructor(this.cursors, this.socket);
  }
}
}

export default Game;