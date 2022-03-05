//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero from "../objects/carguero.js";
import Destructor from "../objects/destructor.js";
import Map from "../objects/map.js";
import LateralCamera from "../objects/lateral_camera.js";

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
    this.save_btn;
    this.cancel_btn;
    this.target = {
      'x': 0,
      'y': 0
    }
  }

  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor_small.png');
    this.load.image('submarino', './static/assets/img/submarino_small.png');
    this.load.image('carguero', './static/assets/img/freighters_small.png');
    this.load.image('torpedo', './static/assets/img/torpedo.png');
    this.load.image('cannon', './static/assets/img/cannon.png');
    this.load.image('tiles', './static/assets/map/terrain.png');
    this.load.image('depth_charge', './static/assets/img/depthcharge.png')
    this.load.image('logo', './static/assets/img/logo.jpeg');
    this.load.tilemapTiledJSON('map', './static/assets/map/map.json');
  }

  loadSpritesheet() {
    this.load.spritesheet('explosion', './static/assets/sprites/explosion_sheet.png', {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 23
    });
  }

  loadAudio() {
    this.load.audio('cannon_sound', './static/assets/audio/cannon_sound.mp3')
      .audio('torpedo_sound', ['./static/assets/audio/torpedo_sound.mp3'])
      .audio('start_game', ['./static/assets/audio/start_game.mp3'])
      .audio('sea_water', ['./static/assets/audio/sea_water.mp3'])
  }

  loadAudioVariables() {
    // aca poner la musca que se use de fondo
    this.sea_water = this.sound.add('sea_water');
    this.sea_water.loop = true;
    this.start_game = this.sound.add('start_game');
    this.cannon_sound = this.sound.add('cannon_sound');
    this.torpedo_sound = this.sound.add('torpedo_sound');
    this.ship_collision_sound;
    this.depth_charge_sound;
    this.bg_sound;
  }

  preload() {
    this.loadImages();
    this.loadAudio();
    this.loadSpritesheet();
  }

  create() {
    var self = this
    this.socket = io("http://localhost:3000")
    this.otherPlayers = this.physics.add.group();
    this.otherPlayersCargueros = this.physics.add.group();
    this.currentPlayers = this.physics.add.group();
    this.loadAudioVariables();
    

    console.log('Obtengo datos pre-game.html');
    var username = this.urlParams.get('username');
    var boatType = this.urlParams.get('boattype');
    var difficulty = this.urlParams.get('dificultad');
    this.username = username;

    this.explosionConfig = {
      key: 'explodeAnimation',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 23,
        first: 23
      }),
      frameRate: 20,
      repeat: 0
    };


    /*
    this.save_btn = this.add.sprite(this.sys.game.config.width/2 , this.sys.game.config.heigth/2, 'Guardar').setInteractive();
    this.save_btn.on('pointerdown', function (event){
      console.log('Guardar');
    });
    //this.save_btn = this.add.sprite(this.sys.game.config.width/2 - 95, this.sys.game.config.heigth, 'Guardar', this.cancelGame, this, 2, 1, 0);
    */

    this.socket.on('inicioInstancia', (backGame) => {
      console.log('Evento inicioInstancia');
      this.games = backGame;
      console.log('Emito createGame');
      this.socket.emit('createGame', username, boatType, difficulty);
    });

    this.socket.on('currentPlayers', (players, gameplay) => {
      this.games = gameplay;
      for (let i = 0; i < players.length; i++) {
        if (players[i].socketId === this.socket.id) {
          this.addPlayer(this, players[i])
        } else {
          this.addOtherPlayers(this, players[i])
        }
        
      }

      

    });

    this.socket.on('newPlayer', (playerInfo) => {
      this.addOtherPlayers(this, playerInfo);
      
      if (self.currentPlayers.scene.currentPlayers.children.entries[0].texture.key === "submarino") {
        if (this.submarino) {
          this.physics.add.overlap(this.submarino.submarino, this.destructor2.destructor, () =>
            this.choque(this.submarino, this.destructor2)
          );
        }
      }else{
        if (this.destructor) {
          this.physics.add.overlap(this.destructor.destructor, this.submarino2.submarino, () =>
            this.choque(this.destructor, this.submarino2)
          );
        }

      }


    
    });

    this.socket.on('addCollition',function(){
      //this.addCollisions(self);
      
    })


    this.socket.on('playerDisconnected', (playerId) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy()
        }
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.socket.on('playerMoved', (playerInfo, gamePlay) => {
      this.games = gamePlay;
      let i = 0;
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.socketId === otherPlayer.socketId) {
          otherPlayer.setRotation(playerInfo.boatList[i].rotation)
          otherPlayer.setPosition(playerInfo.boatList[i].positionX, playerInfo.boatList[i].positionY)
          if (otherPlayer.texture.key == 'submarino') {
            switch (playerInfo.boatList[0].depth) {
              case 1:
                otherPlayer.setAlpha(0.9, 0.9, 0.9, 0.9);
                break;
              case 2:
                otherPlayer.setAlpha(0.7, 0.7, 0, 0);
                break;
              case 3:
                otherPlayer.setAlpha(0.4, 0.4, 0, 0);
                break;
            }
          }
        }
        i++;
      });
    });

    this.socket.on('playerMovedCarguero', (playerInfo, id, gamePlay) => {
      this.games = gamePlay;
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


    // ************* colisiones submarino *************
    this.socket.on('other_destroy_submarino', (info) => {
        console.log("antes de eliminar el submarino 2");
        console.log(info.socketId);
        console.log(this.socket.id);
        console.log(this.otherPlayers.socketId );
        if(this.otherPlayers.socketId == this.socket.id){
          this.currentPlayers.scene.submarino.destroy(false, self);
        }else{
          this.otherPlayers.scene.submarino2.destroy(false, self);

        }
        console.log("eliminado el sub");
    });


    // ************* colisiones destructor ******************
 
    this.socket.on('other_destroy_destructor', (info) => {
      console.log("antes de eliminar el destructor2 2");
      console.log(info.socketId);
        console.log(this.socket.id);
        console.log(this.otherPlayers.socketId );
        if(this.otherPlayers.socketId == this.socket.id){
        this.currentPlayers.scene.destructor.destroy(false, self);
      }else{
        this.currentPlayers.scene.destructor.destroy(false, self);

      }
      console.log("eliminado el destructor2");
    });

    // ******************* fin colisiones ******************* 

    this.socket.on('other_shotTorpedo', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.submarinoShootTorpedos(info, false);
      }
    });

    this.socket.on('other_shotCannon', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.shipShootCannons(info, false);
      }
    });

    this.socket.on('other_shotDepthCharge', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.shootDepthCharge(info, false);
      }
    });

    this.socket.on('other_changeDepth', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.submarineChangeDepth(info, false);
      }
    });

    window.game = this;
    
    this.map = new Map(this, 'map', 'tiles', 'terrain');
  }

  choque(nave1, nave2) {
    nave1.destroy(this.socket, self);
    nave2.destroy(this.socket, self);
  }

  collisionShipArmy(socket, shipOne, shipTwo){
    shipOne.detroy(socket);
    shipTwo.destroy(socket);
  }

  choqueScena(nave, self) {
    //this.lateralCamera = new LateralCamera(this,nave.x,nave.y, 'choque');
    // this.lateralCamera.create(nave.x,nave.y,self);
    var lateralCamera = this.add.image(nave.x, nave.y, 'logo');
    this.input.once('pointerdown', function () {
      lateralCamera.destroy();
      lateralCamera = null
    });
  }

  addPlayer(self, playerInfo) {
    console.log(playerInfo)
    let currentPlayer = null;
    if (playerInfo.boatTeam == 'submarino') {
      //Creo submarino
      console.log('Dibujo submarino')
      var coordS = {
        x: playerInfo.boatList[0].positionX,
        y: playerInfo.boatList[0].positionY,
      }
      this.submarino = new Submarino(self, 0, 0, 'submarino');
      this.submarino.create(coordS, self, true);
      currentPlayer = this.submarino;
      currentPlayer.socketId = playerInfo.socketId;
      this.currentPlayers.add(currentPlayer);
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
          currentPlayer = this.destructor;
          currentPlayer.socketId = playerInfo.socketId;
          this.currentPlayers.add(currentPlayer);
          console.log('pos inicial destructor x:' + coordD.x + 'y:' + coordD.y + ' rotacion:' + this.destructor.rotation);
        } else {
          console.log('Dibujo carguero');
          id++;
          this.carguero = new Carguero(self, 0, 0, 'carguero', id);
          currentPlayer = this.carguero;
          currentPlayer.socketId = playerInfo.socketId;
          this.currentPlayers.add(currentPlayer);
          this.FreightersList.push(this.carguero);
          this.carguero.create(playerInfo.boatList[i])
        }
      }
    }
    this.createUsuarioLabel()
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
    //this.addCollisions(self);


  }

  addCollisions(self) {
    //if (self.currentPlayers.scene.currentPlayers.children.entries[0].texture.key === "submarino") {
      //Colisiones entre barcos
    if ((self.currentPlayers.scene.submarino !== 'undefined') && (self.currentPlayers.scene.destructor2 !== 'undefined')){
      self.physics.add.overlap(self.currentPlayers.scene.submarino, self.otherPlayers.scene.destructor2, () => {
        //this.currentPlayers.scene.submarino.destroy(self.socket, self);
        //this.otherPlayers.scene.destructor2.destroy(self.socket, self);
        console.log('entro al colision submarino con destructor');
      }); 
       //Colision entre destructor y torpedos
       self.physics.add.overlap(self.currentPlayers.scene.submarino.torpedos, self.otherPlayers.scene.destructor2, () => {
        //this.choque(this.currentPlayers.scene.submarino.torpedos, this.otherPlayers.scene.destructor2));
        console.log('entro al colision submarino torpedos con destructor');
      });
      //Colision entre barcos y cañones
      self.physics.add.overlap(self.currentPlayers.scene.submarino.cannons, self.otherPlayers.scene.destructor2, () => {
        //this.choque(this.currentPlayers.scene.submarino.cannons, this.otherPlayers.scene.destructor2));
        console.log('entro al colision submarino canonns con destructor');
      });


    }else if ((self.currentPlayers.scene.submarino2 !== 'undefined') && (self.currentPlayers.scene.destructor !== 'undefined')){
      //Colisiones entre barcos
      self.physics.add.overlap(self.currentPlayers.scene.destructor, self.otherPlayers.scene.submarino2, () => {
        //this.currentPlayers.scene.destructor.destroy(self.socket, self);
        //this.otherPlayers.scene.submarino2.destroy(self.socket, self);
        console.log('entro al colision destructor con submarino');
      });

      //Colision entre barcos y cañones
      self.physics.add.overlap(self.currentPlayers.scene.destructor.cannons, self.otherPlayers.scene.submarino2, () => {
        //this.choque(this.currentPlayers.scene.destructor.cannons, this.otherPlayers.scene.submarino2));
        console.log('entro al colision destructor cannons con submarino');
      });

      //Colisiones entre carga de profundidad y submarino
      self.physics.add.overlap(self.currentPlayers.scene.destructor.depthCharge, self.otherPlayers.scene.submarino2, () => {
        //this.choque(this.currentPlayers.scene.destructor.depthCharge, this.otherPlayers.scene.submarino2));
        console.log('entro al colision destructor carga profundidad con submarino');
      });

    }
  }

  submarinoShootTorpedos(info, socket) {
    if (socket) {
      this.currentPlayers.scene.submarino.torpedos.fireTorpedos(info.x, info.y, socket, info.angle);
    } else {
      this.otherPlayers.scene.submarino2.torpedos.fireTorpedos(info.x, info.y, socket, info.angle);
    }
  }

  shipShootCannons(info, socket) {
    if (info.shipType === 'submarino') {
      if (socket) {
        this.currentPlayers.scene.submarino.cannons.fireCannons(info.x, info.y, socket, info.target, 'submarino');
      } else {
        this.otherPlayers.scene.submarino2.cannons.fireCannons(info.x, info.y, socket, info.target, 'submarino');
      }
    } else {
      if (socket) {
        this.currentPlayers.scene.destructor.cannons.fireCannons(info.x, info.y, socket, info.target, 'destructor');
      } else {
        this.otherPlayers.scene.destructor2.cannons.fireCannons(info.x, info.y, socket, info.target, 'destructor');
      }
    }
  }

  shootDepthCharge(info, socket) {
    if (socket) {
      this.currentPlayers.scene.destructor.depthCharge.fireDepthCharge(info.x, info.y, socket);
    } else {
      this.otherPlayers.scene.destructor2.depthCharge.fireDepthCharge(info.x, info.y, socket);
    }
  }

  submarineChangeDepth(info, socket) {
    if (info.depth === 1) {
      if (socket) {
        this.currentPlayers.scene.submarino.surface(socket);
      } else {
        this.otherPlayers.scene.submarino2.surface(socket);
      }
    } else if (info.depth === 2) {
      if (socket) {
        this.currentPlayers.scene.submarino.immerse(socket);
      } else {
        this.otherPlayers.scene.submarino2.immerse(socket);
      }
    } else if (info.depth === 3) {
      if (socket) {
        this.currentPlayers.scene.submarino.deepImmerse(socket);
      } else {
        this.otherPlayers.scene.submarino2.deepImmerse(socket);
      }
    }
  }

  update() {
    //this.pointer = this.input.mousePointer;

    this.input.on('pointerdown', function (pointer) {
      this.target.x = pointer.x,
        this.target.y = pointer.y
    }, this);

    if (this.submarino !== undefined) {
      this.submarino.moveSubmarino(this.cursors, this.socket, this.input, self, this.target);
    }

    if (this.destructor) {
      this.destructor.moveDestructor(this.cursors, this.socket, this.input, self, this.target);
    }
    for (let i = 0; i < this.FreightersList.length; i++) {
      if (this.FreightersList[i] !== undefined) {
        this.FreightersList[i].moveCarguero(this.socket);
      }
    }
  }

  createUsuarioLabel() {
    this.username = this.add.text(this.sys.game.config.width/2 - 100, 0, 'Jugador: ' + this.username, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });
  }

 

  
}


export default Game;