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

      /*if (this.destructor) {
        this.physics.add.overlap(this.destructor.destructor, this.submarino2.submarino, () =>
        this.choque(this.submarino, this.destructor2)
        );
      }*/

      if (this.destructor) {
        this.physics.add.overlap(this.destructor.destructor, this.submarino2.submarino, () => {
          self.anims.create(self.explosionConfig)
          self.add.sprite(this.destructor.x, this.destructor.y, 'explosion').play('explodeAnimation')
          self.add.sprite(this.submarino2.x + 10, this.submarino2.y + 10, 'explosion').play('explodeAnimation')
          this.choque(this.destructor, this.submarino2, self)
        });
      }

      if (this.destructor) {
        this.physics.add.overlap(this.destructor.depthCharge, this.submarino2.submarino, () =>
          this.collisionShipArmy(this.submarino2, this.destructor.depthCharge, 'entro a this destructor')
        );
      }

      if (this.destructor) {
        this.physics.add.overlap(this.destructor.destructor, this.submarino2.torpedos, () =>
          this.collisionShipArmy(this.destructor, this.submarino2.torpedos)
        );
      }

      if (this.destructor) {
        this.physics.add.overlap(this.destructor.destructor, this.submarino2.cannons, () =>
          this.collisionShipArmy(this.destructor, this.submarino2.cannons));
      }

      if (this.destructor) {
        this.physics.add.overlap(this.destructor.cannons, this.submarino2.submarino, () =>
          this.collisionShipArmy(this.submarino2, this.destructor.cannons));
      }

      //this.sea_water.play();
      // window.game = this;
    });

    this.socket.on('newPlayer', (playerInfo) => {
      this.addOtherPlayers(this, playerInfo);

      if (this.submarino) {
        this.physics.add.overlap(this.submarino.submarino, this.destructor2.destructor, () => {
          self.anims.create(self.explosionConfig)
          self.add.sprite(this.submarino.x, this.submarino.y, 'explosion').play('explodeAnimation')
          self.add.sprite(this.destructor2.x + 10, this.destructor2.y + 10, 'explosion').play('explodeAnimation')
          this.choque(this.submarino, this.destructor2, self)



        });
      }

      if (this.submarino) {
        this.physics.add.overlap(this.submarino.submarino, this.destructor2.depthCharge, () =>
          this.collisionShipArmy(this.submarino, this.destructor2.depthCharge, 'entro a this submarino')
        );
      }

      if (this.submarino) {
        this.physics.add.overlap(this.submarino.torpedos, this.destructor2.destructor, () =>
          this.collisionShipArmy(this.destructor2, this.submarino.torpedos)
        );
      }

      if (this.submarino) {
        this.physics.add.overlap(this.submarino.submarino, this.destructor2.cannons, () =>
          this.collisionShipArmy(this.submarino, this.destructor2.cannons));
      }

      if (this.submarino) {
        this.physics.add.overlap(this.submarino.cannons, this.destructor2.destructor, () =>
          this.collisionShipArmy(this.destructor2, this.submarino.cannons));
      }

      //this.start_game.play();
      //this.sea_water.play();
    });

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

    this.socket.on('other_destroy_submarino', (info, gamePlay) => {
      this.games = gamePlay;
      if (this.submarino) {
        this.submarino.destroy();
      }
      else {
        this.submarino2.destroy();
      }
    });

    this.socket.on('other_destroy_destructor', (info, gamePlay) => {
      this.games = gamePlay;
      if (this.destructor) {
        this.destructor.destroy();
      } else {
        this.destructor2.destroy();
      }
    });

    /*this.socket.on('other_destroy_depthCharge', (info, gamePlay) => {
      this.games=gamePlay;
      this.destructor.depthCharge.destroy();
    });*/

    this.socket.on('other_destroy_torpedo', (info, gamePlay) => {
      this.games = gamePlay;
      this.destructor.depthCharge.destroy();
    });

    this.socket.on('other_shot', (info, gamePlay) => {
      this.games = gamePlay;
      this.submarino2.shootTorpedo();
    });

    this.socket.on('other_shotCannon', (info, gamePlay) => {
      this.games = gamePlay;
      this.submarino2.shootCannon();
    });

    this.socket.on('other_shotCannonDestructor', (info, gamePlay) => {
      this.games = gamePlay;
      this.destructor2.shootCannon();
    });

    this.socket.on('other_shotDepthCharge', (info, gamePlay) => {
      this.games = gamePlay;
      this.destructor2.shootDepthCharge();
    });

    this.socket.on('other_surface', (info, gamePlay) => {
      this.games = gamePlay;
      console.log('submarino en superficie');
      this.submarino2.surfaceOpponent();
    });

    this.socket.on('other_immerse', (info, gamePlay) => {
      this.games = gamePlay;
      console.log('submarino sumergido');
      this.submarino2.immerseOpponent();
    });

    this.socket.on('other_deepImmerse', (info, gamePlay) => {
      this.games = gamePlay;
      console.log('submarino sumergido profundo');
      this.submarino2.deepImmerseOpponent(info);
    });

    this.socket.on('opponentThrowDepthCharge', function (info, gamePlay) {
      this.games = gamePlay;
      self.destructor2.depthCharge.fireDepthChargeOpponent(info.x, info.y, self, this.socket);
    });

    this.map = new Map(this, 'map', 'tiles', 'terrain');
  }

  choque(nave1, nave2, self) {
    /*self.anims.create(self.explosionConfig);
  
    self.add.sprite(this.games.game.playerList[0].boatList[0].positionX, this.games.game.playerList[0].boatList[0].positiony, 'explosion').play('explodeAnimation');
    self.add.sprite(this.games.game.playerList[0].boatList[0].positionX + 10, this.games.game.playerList[0].boatList[0].positionY + 10, 'explosion').play('explodeAnimation');
  
  */

    nave1.destroy(this.socket, this);
    nave2.destroy(this.socket, this);
  }

  collisionShipArmy(objectShip, objectArmy, string) {
    objectShip.life = objectShip.life - 1;
    //objectArmy.destroy(this.socket, this);
    if (objectShip.life === 0) {
      objectShip.destroy(this.socket, this);
      objectArmy.destroy();
    }
    console.log('Vida nave1 =' + objectShip.life);
    console.log(string);
    //REDUCIR VIDA NO DESTRUIR VER!!!
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

  addCollisions() {
    //Colisiones entre barcos
    this.physics.add.overlap(this.submarino.submarino, this.destructor2.destructor, () =>
      this.choque(this.submarino, this.destructor2));

    this.physics.add.overlap(this.destructor.destructor, this.submarino2.submarino, () =>
      this.choque(this.destructor, this.submarino2));

    //Colisiones entre submarino y carga de profundidad
    this.physics.add.overlap(this.submarino.submarino, this.destructor2.depthCharge, () =>
      this.collisionShipArmy(this.submarino, this.destructor2.depthCharge));

    this.physics.add.overlap(this.destructor.depthCharge, this.submarino2.submarino, () =>
      this.collisionShipArmy(this.submarino2, this.destructor.depthCharge));

    //Colision entre barcos y torpedos
    this.physics.add.overlap(this.destructor.destructor, this.submarino2.torpedos, () =>
      this.collisionShipArmy(this.destructor, this.submarino2.torpedos));

    this.physics.add.overlap(this.submarino.torpedos, this.destructor2.destructor, () =>
      this.collisionShipArmy(this.destructor2, this.submarino.torpedos));

    //Colision entre barcos y cañones
    this.physics.add.overlap(this.destructor.destructor, this.submarino2.cannons, () =>
      this.collisionShipArmy(this.destructor, this.submarino2.cannons));

    this.physics.add.overlap(this.destructor.cannons, this.submarino2.submarino, () =>
      this.collisionShipArmy(this.submarino2, this.destructor.cannons));

    this.physics.add.overlap(this.submarino.submarino, this.destructor2.cannons, () =>
      this.collisionShipArmy(this.submarino, this.destructor2.cannons));

    this.physics.add.overlap(this.submarino.cannons, this.destructor2.destructor, () =>
      this.collisionShipArmy(this.destructor2, this.submarino.cannons));
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
}

export default Game;