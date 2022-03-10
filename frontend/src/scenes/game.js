//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero from "../objects/carguero.js";
import Destructor from "../objects/destructor.js";
import Map from "../objects/map.js";

class Game extends Phaser.Scene {
  /*Constructor de la clase Game, inicializo la clase*/
  constructor() {
    super('Game');
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
    this.msg;
    this.timeText;
    this.totalTime;
    this.mostrar_reloj = false;
    this.remainingTime;
    this.target = {
      'x': 0,
      'y': 0
    }
    this.idGame = -1;
    this.gameDifficulty;
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

    //Obtengo datos pre-game.html'
    var username = this.urlParams.get('username');
    var boatType = this.urlParams.get('boattype');
    var difficulty = this.urlParams.get('dificultad');
    this.gameDifficulty = difficulty;
    if (!(this.urlParams.get('idGame') == 'undefined')) {
      this.idGame = this.urlParams.get('idGame');
    }

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

    this.socket.on('inicioInstancia', (backGame,hacerLoad) => {
      this.games = backGame;
      if (hacerLoad) {
        this.socket.emit('loadGame', this.socket.id);
        //cantidadLoadPlayers++;
      } else {
        this.socket.emit('createGame', username, boatType, difficulty);
      }
    });

    this.socket.on('currentPlayers', (players, gameplay) => {
      this.games = gameplay;
      for (let i = 0; i < players.length; i++) {
        if (players[i].socketId === this.socket.id) {
          this.addPlayer(this, players[i])
          this.start_game.play();
        } else {
          this.addOtherPlayers(this, players[i])
          this.start_game.play();
        }
      }
      if (players.length == 2) {
        this.defineCollisions(self);
        this.ignoreSmallMap();
        //this.clockTimeOut(this.socket);
        this.setGameTimeOut(this.socket, self);

      }
    });

    this.socket.on('newPlayer', (playerInfo) => {
      this.addOtherPlayers(this, playerInfo);
      this.defineCollisions(self);
      this.ignoreSmallMap();
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
            if (playerInfo.boatList[i].positionX > 3100 && playerInfo.boatList[i].positionX < 3105) {
              this.freightersWins();
            } else
              otherPlayersCargueros.setPosition(playerInfo.boatList[i].positionX, playerInfo.boatList[i].positionY)
          }
        }
        i++;
      });
    });

    //Destroy de submarino en la pantalla del enemigo
    this.socket.on('other_destroy_submarino', (info) => {
      //Comparo el socket id en other para eliminar mi copia
      if (this.otherPlayers.children.entries.length > 0) {
        if (this.otherPlayers.children.entries[0].socketId == info.socketId) {
          for (let i = 0; i < this.otherPlayers.children.entries.length; i++) {
            if (this.otherPlayers.children.entries[i].texture.key == 'submarino') {
              this.otherPlayers.children.entries[i].destroy(false, self);
            }
          }
        } else {
          for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
            if (this.currentPlayers.children.entries[i].texture.key == 'submarino') {
              this.currentPlayers.children.entries[i].destroy(false, self);
            }
          }
        }
      } else {
        for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
          if (this.currentPlayers.children.entries[i].texture.key == 'submarino') {
            this.currentPlayers.children.entries[i].destroy(false, self);
          }
        }
      }
    });

    //Destroy de destructor en la pantalla del enemigo
    this.socket.on('other_destroy_destructor', (info) => {
      //Comparo el socket id en other para eliminar mi copia
      if (this.otherPlayers.children.entries.length > 0) {
        if (this.otherPlayers.children.entries[0].socketId == info.socketId) {
          for (let i = 0; i < this.otherPlayers.children.entries.length; i++) {
            if (this.otherPlayers.children.entries[i].texture.key == 'destructor') {
              this.otherPlayers.children.entries[i].destroy(false, self);
            }
          }
        } else {
          for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
            if (this.currentPlayers.children.entries[i].texture.key == 'destructor') {
              this.currentPlayers.children.entries[i].destroy(false, self);
            }
          }
        }
      } else {
        for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
          if (this.currentPlayers.children.entries[i].texture.key == 'destructor') {
            this.currentPlayers.children.entries[i].destroy(false, self);
          }
        }
      }
    });

    //Destroy de torpedo en la pantalla del enemigo
    this.socket.on('other_destroy_torpedo', (info) => {
      //Comparo el socket id en other para eliminar mi copia
      if (this.otherPlayers.children.entries.length > 0) {
        if (this.otherPlayers.children.entries[0].socketId == info.socketId) {
          for (let i = 0; i < this.otherPlayers.children.entries.length; i++) {
            if (this.otherPlayers.children.entries[i].texture.key == 'submarino') {
              let last = this.otherPlayers.scene.submarino2.torpedos.children.entries.length - 1;
              this.otherPlayers.scene.submarino2.torpedos.children.entries[last].destroy();
            }
          }
        } else {
          for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
            if (this.currentPlayers.children.entries[i].texture.key == 'submarino') {
              let last = this.otherPlayers.scene.submarino.torpedos.children.entries.length - 1;
              this.currentPlayers.scene.submarino.torpedos.children.entries[last].destroy();
            }
          }
        }
      } else {
        for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
          if (this.currentPlayers.children.entries[i].texture.key == 'submarino') {
            let last = this.currentPlayers.scene.submarino.torpedos.children.entries.length - 1;
            this.currentPlayers.scene.submarino.torpedos.children.entries[last].destroy();
          }
        }
      }
    });

    //Destroy de cannon en la pantalla del enemigo
    this.socket.on('other_destroy_cannons', (info) => {
      //Comparo el socket id en other para eliminar mi copia
      if (this.otherPlayers.children.entries.length > 0) {
        if (this.otherPlayers.children.entries[0].socketId == info.socketId) {
          for (let i = 0; i < this.otherPlayers.children.entries.length; i++) {
            if (this.otherPlayers.children.entries[i].texture.key == 'submarino') {
              let last = this.otherPlayers.scene.submarino2.cannons.children.entries.length - 1;
              this.otherPlayers.scene.submarino2.cannons.children.entries[last].destroy();
            }
          }
        } else {
          for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
            if (this.currentPlayers.children.entries[i].texture.key == 'submarino') {
              let last = this.currentPlayers.scene.submarino.cannons.children.entries.length - 1;
              this.currentPlayers.scene.submarino.cannons.children.entries[last].destroy();
            }
          }
        }
      } else {
        for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
          if (this.currentPlayers.children.entries[i].texture.key == 'submarino') {
            let last = this.currentPlayers.scene.submarino.cannons.children.entries.length - 1;
            this.currentPlayers.scene.submarino.cannons.children.entries[last].destroy();
          }
        }
      }
    });

    //Destroy de depth charge en la pantalla del enemigo
    this.socket.on('other_destroy_depthCharge', (info) => {
      //Comparo el socket id en other para eliminar mi copia
      if (this.otherPlayers.children.entries.length > 0) {
        if (this.otherPlayers.children.entries[0].socketId == info.socketId) {
          for (let i = 0; i < this.otherPlayers.children.entries.length; i++) {
            if (this.otherPlayers.children.entries[i].texture.key == 'destructor') {
              let last = this.otherPlayers.scene.destructor2.depthCharges.children.entries.length - 1;
              this.otherPlayers.scene.destructor2.depthCharges.children.entries[last].destroyDepthCharge();
            }
          }
        } else {
          for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
            if (this.currentPlayers.children.entries[i].texture.key == 'destructor') {
              let last = this.currentPlayers.scene.destructor.depthCharges.children.entries.length - 1;
              this.currentPlayers.scene.destructor.depthCharges.children.entries[last].destroyDepthCharge();
            }
          }
        }
      } else {
        for (let i = 0; i < this.currentPlayers.children.entries.length; i++) {
          if (this.currentPlayers.children.entries[i].texture.key == 'destructor') {
            let last = this.currentPlayers.scene.destructor.depthCharges.children.entries.length - 1;
            this.currentPlayers.scene.destructor.depthCharges.children.entries[last].destroyDepthCharge();
          }
        }
      }
    });

    //Dibujo el torpedo en la pantalla del enemigo
    this.socket.on('other_shotTorpedo', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.submarinoShootTorpedos(info, false);
      }
    });

    //Dibujo el cannon en la pantalla del enemigo
    this.socket.on('other_shotCannon', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.shipShootCannons(info, false);
      }
    });

    //Dibujo la depth charge en la pantalla del enemigo
    this.socket.on('other_shotDepthCharge', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.shootDepthCharge(info, false);
      }
    });

    //Cambio la profunidad del submarino en la pantalla del enemigo
    this.socket.on('other_changeDepth', (info) => {
      if (info.socket_id !== self.socket.id) {
        this.submarineChangeDepth(info, false);
      }
    });

    //Muestra cartel de victoria por rendicion del enemigo
    this.socket.on('canceledGame', (socket_id) => {
      if (socket_id !== self.socket.id) {
        self.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "victory_surrender");
        this.scene.pause('Game');
      }
    });

    //Muestra cartel de fin de partida
    this.socket.on('finishedGame', (socket_id) => {
      if (socket_id !== self.socket.id) {
        self.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "game_over");
        this.scene.pause('Game');
      }

    });

    //Muestra el tiempo de la partida
    this.socket.on('showedTime', (socket_id) => {
      if (socket_id !== self.socket.id) {
        this.mostrar_reloj = true;
      }

    });

    //Reloj de la partida
    this.socket.on('other_emit_clock', (info) => {
      switch (info.minutes) {
        case 5:
          console.log('5 minutos restantes');
          this.msg = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Inicio la partida");
          break;
        case 4:
          console.log('4 minutos restantes');
          break;
        case 3:
          console.log('3 minutos restantes');
          break;
        case 2:
          console.log('2 minutos restantes');
          break;
        case 1:
          console.log('1 minutos restante');
          break;
        case 0:
          console.log('fin de partida, empate');
          break;
      }
    });

    //Muestra cartel de victoria si los cargueros llegan al otro lado del mapa
    this.socket.on('who_wins', (info) => {
      if (info.socketId === this.socket.id) {
        this.add.image(this.currentPlayers.children.entries[0].coodOriginalX, this.currentPlayers.children.entries[0].coodOriginalY, "victory");
        this.bg_sound.play();
      } else {
        this.add.image(this.otherPlayers.children.entries[0].x, this.currentPlayers.children.entries[0].y, "victory");
        this.bg_sound.play();
      }
    });

    //Muestra cartel de derrota si gana el submarino enemigo
    this.socket.on('other_submarino_wins', (info) => {
      if (info.socketId !== self.socket.id) {
        self.add.image(this.otherPlayers.children.entries[0].x, this.otherPlayers.children.entries[0].y, "defeat");
      }
    });

    //Muestra cartel de derrota si gana el destructor enemigo
    this.socket.on('other_destructor_wins', (info) => {
      if (info.socketId !== self.socket.id) {
        self.add.image(this.otherPlayers.children.entries[0].x, this.otherPlayers.children.entries[0].y, "defeat");
      }
    });

    //Muestra cartel de derrota si gana el destructor enemigo porque llegan los cargueros al otro extremo
    this.socket.on('other_carguero_wins', (info) => {
      if (info.socketId !== self.socket.id) {
        self.add.image(this.otherPlayers.children.entries[0].x, this.otherPlayers.children.entries[0].y, "victory");
      } else {
        self.add.image(this.otherPlayers.children.entries[0].x, this.otherPlayers.children.entries[0].y, "defeat");
      }
    });

    //Muestra cartel de empate
    this.socket.on('other_empate', (info) => {
      if (info.socketId !== self.socket.id) {
        self.add.image(info.x, info.y, "empate");
        this.bg_sound.play();
      }
    });

    //Crea el mapa en la escena
    this.map = new Map(this, 'map', 'tiles', 'terrain');
    this.physics.world.setBounds(0, 0, 3200, 1120);

    //Se utiliza para realizar debug en el front
    //window.game = this;
  }

  tiempo() {
    var timeTextStyle = { font: "24px Roboto", fill: '#E43AA4', stroke: '#000', strokeThickness: 4 };
    this.timeText = this.add.text(); //Elapsed Time Text
    var gameRuntime = (this.totalTime - this.scene.systems.time.now)
    this.remainingTime = gameRuntime * 0.001
    this.timeText.setText("Tiempo de la partida: " + Math.round(this.remainingTime) + " seconds");
  }

  update() {
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

  //Metodos de colisiones entre barcos y armas

  choque(obj1, obj2, self) {
    this.add.image(obj1.coodOriginalX, obj1.coodOriginalY, "empate");
    var coordX = obj1.coodOriginalX;
    var coordY = obj1.coodOriginalY;
    this.socket.emit('empate', {
      socketId: this.socket.id,
      x: coordX,
      y: coordY
    });
    obj1.destroy(this.socket, self);
    obj2.destroy(this.socket, self);
    this.bg_sound.play();
  }

  choqueDepthCharge(obj1, obj2, self) {
    this.add.image(obj1.coodOriginalX, obj1.coodOriginalY, "victory");
    var coordX = obj1.coodOriginalX;
    var coordY = obj1.coodOriginalY;
    this.socket.emit('destructor_wins', {
      socketId: this.socket.id,
      x: coordX,
      y: coordY
    });
    obj1.destroy(this.socket, self);
    obj2.destroy(this.socket, self);
    this.bg_sound.play();
  }

  collisionShipTorpedo(obj1, obj2, self) {
    var coordX;
    var coordY;
    if (obj1.texture.key === 'destructor') {
      coordX = obj1.destructor.x;
      coordY = obj1.destructor.y;
    } else {
      coordX = obj1.submarino.x;
      coordY = obj1.submarino.y;
    }
    if (obj1.life < 1) {
      obj1.destroy(this.socket, self);
      this.checkVictory();
    } else {
      self.anims.create(self.explosionConfig);
      self.add.sprite(coordX, coordY, 'explosion').play('explodeAnimation');
      obj1.life -= 2;
    }
    obj2.destroy(this.socket, self);
    this.choqueScena(obj1, self);
  }

  collisionShipCannon(obj1, obj2, self) {
    var coordX;
    var coordY;
    if (obj1.texture.key === 'destructor') {
      coordX = obj1.destructor.x;
      coordY = obj1.destructor.y;
    } else {
      coordX = obj1.submarino.x;
      coordY = obj1.submarino.y;
    }
    if (obj1.life < 1) {
      obj1.destroy(this.socket, self);
      this.checkVictory();
    } else {
      self.anims.create(self.explosionConfig);
      self.add.sprite(coordX, coordY, 'explosion').play('explodeAnimation');
      obj1.life -= 1;
    }
    obj2.destroy(this.socket, self);
    this.choqueScena(obj1, self);
  }

  choqueScena(nave, self) {
    var coordX;
    var coordY;
    if (nave.texture.key === 'destructor') {
      coordX = nave.destructor.x;
      coordY = nave.destructor.y;
    } else {
      coordX = nave.submarino.x;
      coordY = nave.submarino.y;
    }
    var lateralCamera = this.add.image(coordX, coordY - 50, 'destruccion');
    setTimeout(function () {
      lateralCamera.destroy();
      lateralCamera = null;
    }, 2000);

  }

  //Metodos de creacion de jugadores

  addPlayer(self, playerInfo) {
    console.log(playerInfo)
    let currentPlayer = null;
    if (playerInfo.boatTeam == 'submarino') {
      //Creo submarino
      //Dibujo submarino
      var coordS = {
        x: playerInfo.boatList[0].positionX,
        y: playerInfo.boatList[0].positionY,
      }
      this.submarino = new Submarino(self, 0, 0, 'submarino', this.gameDifficulty);
      this.submarino.create(coordS, self, true);
      currentPlayer = this.submarino;
      currentPlayer.socketId = playerInfo.socketId;
      this.currentPlayers.add(currentPlayer);
    } else {
      //Creo destructor y cargueros
      this.destructor = new Destructor(self, 0, 0, 'destructor', this.gameDifficulty);
      let id = 0;
      for (let i = 0; i < playerInfo.boatList.length; i++) {
        if (playerInfo.boatList[i].type == 'destructor') {
          //Dibujo Destructor
          var coordD = {
            x: playerInfo.boatList[i].positionX,
            y: playerInfo.boatList[i].positionY,
          };
          this.destructor.create(coordD, self, true);
          currentPlayer = this.destructor;
          currentPlayer.socketId = playerInfo.socketId;
          this.currentPlayers.add(currentPlayer);
        } else {
          //Dibujo carguero
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
    this.gameDifficulty = this.games.game.idDifficulty.id;
    if (playerInfo.boatTeam == 'destructor') {
      this.destructor2 = new Destructor(self, 0, 0, 'destructor', this.gameDifficulty);
      for (let i = 0; i < playerInfo.boatList.length; i++) {
        let otherPlayer = null;
        let otherPlayersCarguero = null;
        if (playerInfo.boatList[i].type == 'destructor') {
          //Dibujo destructor secundario
          var coordD2 = {
            x: playerInfo.boatList[i].positionX,
            y: playerInfo.boatList[i].positionY,
          };
          otherPlayer = this.destructor2.create(coordD2, self, false);
          otherPlayer.socketId = playerInfo.socketId;
          this.otherPlayers.add(otherPlayer);
        } else {
          //Dibujo carguero secundario
          this.carguero2 = new Carguero(self, 0, 0, 'carguero');
          otherPlayersCarguero = this.carguero2.create(playerInfo.boatList[i]);
          otherPlayersCarguero.socketId = playerInfo.socketId;
          this.otherPlayersCargueros.add(otherPlayersCarguero);
        }
      }
    } else {
      let otherPlayer = null;
      //Dibujo submarino secundario
      var coordS2 = {
        x: playerInfo.boatList[0].positionX,
        y: playerInfo.boatList[0].positionY,
      }
      this.submarino2 = new Submarino(self, 0, 0, 'submarino', this.gameDifficulty );
      otherPlayer = this.submarino2.create(coordS2, self, false);
      otherPlayer.socketId = playerInfo.socketId;
      this.otherPlayers.add(otherPlayer)
    }
  }

  //Metodos de definicion de colisiones
  defineCollisions(self) {
    if (this.currentPlayers.children.entries[0].texture.key === 'destructor') {
      //Colision entre destructor y submarino
      this.physics.add.overlap(this.destructor.destructor, this.submarino2.submarino, () => {
        if (this.submarino2.depth != 3) {
          console.log('entro al overlap de destructor con submarino');
          this.choque(this.destructor, this.submarino2, self);
        }
      });
      //Colision destructor con cannon de submarino
      this.physics.add.overlap(this.destructor.destructor, this.submarino2.cannons, () => {
        console.log('entro al overlap de cannon con destructor');
        this.collisionShipCannon(this.destructor, this.submarino2.cannons, self);
      });
      //Colision cannon destructor con submarino 
      this.physics.add.overlap(this.destructor.cannons, this.submarino2.submarino, () => {
        if (this.submarino2.depth != 3) {
          console.log('entro al overlap de canon con submarino');
          this.collisionShipCannon(this.submarino2, this.destructor.cannons, self);
        }
      });
      //Colision destructor con torpedo submarino 
      this.physics.add.overlap(this.destructor.destructor, this.submarino2.torpedos, () => {
        console.log('entro al overlap de canon con submarino');
        this.collisionShipTorpedo(this.destructor, this.submarino2.torpedos, self);
      });
      //Colision depth charge destructor con submarino 
      this.physics.add.overlap(this.destructor.depthCharges, this.submarino2.submarino, () => {
        console.log('entro al overlap de canon con submarino');
        if (this.submarino2.depth === this.destructor.depthCharges.depth) {
          this.choqueDepthCharge(this.destructor.depthCharges, this.submarino2, self);
        }
      });

      //Colisiones de cargueros
      this.defineCollisionsFreightersDestuctor();

    } else {
      //Colision entre submarino y destructor
      this.physics.add.overlap(this.submarino.submarino, this.destructor2.destructor, () => {
        if (this.submarino.depth != 3) {
          console.log('entro al overlap de submarino con destructor');
          this.choque(this.submarino, this.destructor2, self);
        }
      });
      //Colision submarino con cannon de destructor
      this.physics.add.overlap(this.submarino.submarino, this.destructor2.cannons, () => {
        if (this.submarino.depth != 3) {
          console.log('entro al overlap de cannon con destructor');
          this.collisionShipCannon(this.submarino, this.destructor2.cannons, self);
        }
      });
      //Colision submarino con carga de profunidad de destructor
      this.physics.add.overlap(this.submarino.submarino, this.destructor2.depthCharges, () => {
        console.log('entro al overlap de depthCharge con destructor');
        if (this.submarino.depth === this.destructor2.depthCharges.depth) {
          this.choqueDepthCharge(this.submarino, this.destructor2.depthCharges, self);
        }
      });
      //Colision torpedo submarino con destructor
      this.physics.add.overlap(this.submarino.torpedos, this.destructor2.destructor, () => {
        console.log('entro al overlap de torpedo con destructor');
        this.collisionShipTorpedo(this.destructor2, this.submarino.torpedos, self);
      });
      //Colision cannon submarino con destructor
      this.physics.add.overlap(this.submarino.cannons, this.destructor2.destructor, () => {
        console.log('entro al overlap de canon con destructor');
        this.collisionShipCannon(this.destructor2, this.submarino.cannons, self);
      });

      //Colisiones de cargueros
      this.defineCollisionsFreightersSubmarino();

    }
  }

  //Colisiones de cargueros con destructor
  defineCollisionsFreightersDestuctor() {
    this.physics.add.overlap(this.destructor.destructor, this.FreightersList[0].carguero, () => {
      console.log('entro al overlap de destructor con carguero 0');
    });
    this.physics.add.overlap(this.destructor.destructor, this.FreightersList[1].carguero, () => {
      console.log('entro al overlap de destructor con carguero 1');
    });
    this.physics.add.overlap(this.destructor.destructor, this.FreightersList[2].carguero, () => {
      console.log('entro al overlap de destructor con carguero 2');
    });
    this.physics.add.overlap(this.destructor.destructor, this.FreightersList[3].carguero, () => {
      console.log('entro al overlap de destructor con carguero 3');
    });
    this.physics.add.overlap(this.destructor.destructor, this.FreightersList[4].carguero, () => {
      console.log('entro al overlap de destructor con carguero 4');
    });
    this.physics.add.overlap(this.destructor.destructor, this.FreightersList[5].carguero, () => {
      console.log('entro al overlap de destructor con carguero 5');
    });
  }

  //Colisiones de cargueros con submarino
  defineCollisionsFreightersSubmarino() {
    this.physics.add.overlap(this.submarino.submarino, this.otherPlayersCargueros.children.entries[0], () => {
      console.log('entro al overlap de submarino con carguero 0');
      if (this.otherPlayersCargueros.children.entries[0].available){
        this.choque(this.submarino.submarino, this.otherPlayersCargueros.children.entries[0]);
      }
    });
    this.physics.add.overlap(this.submarino.submarino, this.otherPlayersCargueros.children.entries[1], () => {
      console.log('entro al overlap de submarino con carguero 1');
      if (this.otherPlayersCargueros.children.entries[1].available){
        this.choque(this.submarino.submarino, this.otherPlayersCargueros.children.entries[1]);
      }
    });
    this.physics.add.overlap(this.submarino.submarino, this.otherPlayersCargueros.children.entries[2], () => {
      console.log('entro al overlap de submarino con carguero 2');
      if (this.otherPlayersCargueros.children.entries[2].available){
        this.choque(this.submarino.submarino, this.otherPlayersCargueros.children.entries[2]);
      }
    });
    this.physics.add.overlap(this.submarino.submarino, this.otherPlayersCargueros.children.entries[3], () => {
      console.log('entro al overlap de submarino con carguero 3');
      if (this.otherPlayersCargueros.children.entries[3].available){
        this.choque(this.submarino.submarino, this.otherPlayersCargueros.children.entries[3]);
      }
    });
    this.physics.add.overlap(this.submarino.submarino, this.otherPlayersCargueros.children.entries[4], () => {
      console.log('entro al overlap de submarino con carguero 4');
      if (this.otherPlayersCargueros.children.entries[4].available){
        this.choque(this.submarino.submarino, this.otherPlayersCargueros.children.entries[4]);
      }
    });
    this.physics.add.overlap(this.submarino.submarino, this.otherPlayersCargueros.children.entries[5], () => {
      console.log('entro al overlap de submarino con carguero 5');
      if (this.otherPlayersCargueros.children.entries[5].available){
        this.choque(this.submarino.submarino, this.otherPlayersCargueros.children.entries[5]);
      }
    });

    //Collision submarino torpedo con Cargueros
    this.physics.add.overlap(this.submarino.torpedos, this.otherPlayersCargueros.children.entries[0], () => {
      console.log('entro al overlap de torpedos con carguero 0');
    });
    this.physics.add.overlap(this.submarino.torpedos, this.otherPlayersCargueros.children.entries[1], () => {
      console.log('entro al overlap de torpedos con carguero 1');
    });
    this.physics.add.overlap(this.submarino.torpedos, this.otherPlayersCargueros.children.entries[2], () => {
      console.log('entro al overlap de torpedos con carguero 2');
    });
    this.physics.add.overlap(this.submarino.torpedos, this.otherPlayersCargueros.children.entries[3], () => {
      console.log('entro al overlap de torpedos con carguero 3');
    });
    this.physics.add.overlap(this.submarino.torpedos, this.otherPlayersCargueros.children.entries[4], () => {
      console.log('entro al overlap de torpedos con carguero 4');
    });
    this.physics.add.overlap(this.submarino.torpedos, this.otherPlayersCargueros.children.entries[5], () => {
      console.log('entro al overlap de torpedos con carguero 5');
    });

    //Collision submarino cannons con Cargueros
    this.physics.add.overlap(this.submarino.cannons, this.otherPlayersCargueros.children.entries[0], () => {
      console.log('entro al overlap de cannons con carguero');
    });
    this.physics.add.overlap(this.submarino.cannons, this.otherPlayersCargueros.children.entries[1], () => {
      console.log('entro al overlap de cannons con carguero');
    });
    this.physics.add.overlap(this.submarino.cannons, this.otherPlayersCargueros.children.entries[2], () => {
      console.log('entro al overlap de cannons con carguero');
    });
    this.physics.add.overlap(this.submarino.cannons, this.otherPlayersCargueros.children.entries[3], () => {
      console.log('entro al overlap de cannons con carguero');
    });
    this.physics.add.overlap(this.submarino.cannons, this.otherPlayersCargueros.children.entries[4], () => {
      console.log('entro al overlap de cannons con carguero');
    });
    this.physics.add.overlap(this.submarino.cannons, this.otherPlayersCargueros.children.entries[5], () => {
      console.log('entro al overlap de cannons con carguero');
    });
  }

  //Disparo de torpedo en la pantalla del enemigo
  submarinoShootTorpedos(info, socket) {
    if (socket) {
      this.currentPlayers.scene.submarino.torpedos.fireTorpedos(info.x, info.y, socket, info.angle);
    } else {
      this.otherPlayers.scene.submarino2.torpedos.fireTorpedos(info.x, info.y, socket, info.angle);
    }
  }

  //Disparo de cannon en la pantalla del enemigo
  shipShootCannons(info, socket) {
    if (info.shipType === 'submarino') {
      if (socket) {
        this.currentPlayers.scene.submarino.cannons.fireCannons(info.x, info.y, socket, info.target, 'submarino', info.angle);
      } else {
        this.otherPlayers.scene.submarino2.cannons.fireCannons(info.x, info.y, socket, info.target, 'submarino', info.angle);
      }
    } else {
      if (socket) {
        this.currentPlayers.scene.destructor.cannons.fireCannons(info.x, info.y, socket, info.target, 'destructor', info.angle);
      } else {
        this.otherPlayers.scene.destructor2.cannons.fireCannons(info.x, info.y, socket, info.target, 'destructor', info.angle);
      }
    }
  }

  //Disparo de depth charge en la pantalla del enemigo
  shootDepthCharge(info, socket) {
    if (socket) {
      this.currentPlayers.scene.destructor.depthCharges.fireDepthCharge(info.x, info.y, socket);
    } else {
      this.otherPlayers.scene.destructor2.depthCharges.fireDepthCharge(info.x, info.y, socket);
    }
  }

  //Cambiar la profunidad del submarino en la pantalla del enemigo
  submarineChangeDepth(info, socket) {
    if (info.depth === 1) {
      if (socket) {
        this.currentPlayers.scene.submarino.surfaceOpponent(socket);
        this.currentPlayers.scene.submarino.depth = 1;
      } else {
        this.otherPlayers.scene.submarino2.surfaceOpponent(socket);
        this.currentPlayers.scene.submarino.depth = 1;
      }
    } else if (info.depth === 2) {
      if (socket) {
        this.currentPlayers.scene.submarino.immerseOpponent(socket);
        this.currentPlayers.scene.submarino.depth = 2;
      } else {
        this.otherPlayers.scene.submarino2.immerseOpponent(socket);
        this.currentPlayers.scene.submarino.depth = 2;
      }
    } else if (info.depth === 3) {
      if (socket) {
        this.currentPlayers.scene.submarino.deepImmerseOpponent(socket);
        this.currentPlayers.scene.submarino.depth = 3;
      } else {
        this.otherPlayers.scene.submarino2.deepImmerseOpponent(socket);
        this.currentPlayers.scene.submarino.depth = 3;
      }
    }
  }

  //Muestra el nombre del jugador en la pantalla
  createUsuarioLabel() {
    this.username = this.add.text(this.sys.game.config.width / 2 - 100, 0, 'Jugador: ' + this.username, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });
    this.username.fixedToCamera = true
  }

  //Mini mapa, jugador solo se ve a el mismo
  ignoreSmallMap() {
    for (let i = 0; i < this.otherPlayers.children.entries.length; i++) {
      this.smallCamera.ignore(this.otherPlayers.children.entries[i]);
    }
    for (let i = 0; i < this.otherPlayersCargueros.children.entries.length; i++) {
      this.smallCamera.ignore(this.otherPlayersCargueros.children.entries[i]);
    }
  }

  //Guarda la partida en curso
  saveGame() {
    let socket_id = this.socket.id;
    this.socket.emit('saveGame', socket_id, this.games.game.playerList[0].name, this.games.game.playerList[1].name, this.games.game.idDifficulty);
  }

  //Cancela la partida en curso
  cancelGame(self) {
    let socket_id = this.socket.id;
    this.socket.emit('cancelGame', socket_id);
    self.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "defeat_surrender");
    this.scene.pause('Game');
  }

  setGameTimeOut(socket, self) {
    
    console.log('por setear el tiempo' + this.gameDifficulty);
    var time;
    var difficulty = parseInt(this.gameDifficulty);
    switch (difficulty) {
      case 1:
        time = 360000;
        break;
      case 2:
        time = 240000;
      case  3:
          time = 120000;
        break;
    }
    setTimeout(function () {
      console.log('en set timeout.- valor de tiempo' + time);  
      socket.emit('finishGame', socket.id);
      console.log('despues del emit de finishgame');  
      self.add.image(500, 600, "game_over");
      console.log('despues de la imagen');  
      self.scene.pause('Game');
    }, time);
  }


  //Carga de imagenes en la escena
  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor_small.png');
    this.load.image('submarino', './static/assets/img/submarino_small.png');
    this.load.image('carguero', './static/assets/img/freighters_small.png');
    this.load.image('torpedo', './static/assets/img/torpedo.png');
    this.load.image('cannon', './static/assets/img/cannon.png');
    this.load.image('tiles', './static/assets/map/terrain.png');
    this.load.image('depth_charge', './static/assets/img/depthcharge.png')
    this.load.image('logo', './static/assets/img/logo.jpeg');
    this.load.image('victory', './static/assets/img/victory.png');
    this.load.image('victory_surrender', './static/assets/img/victory_surrender.png');
    this.load.image('defeat', './static/assets/img/defeat.png');
    this.load.image('defeat_surrender', './static/assets/img/defeat_surrender.png');
    this.load.image('game_over', './static/assets/img/game_over.png');
    this.load.image('destruccion', './static/assets/img/destruccion2.png');
    this.load.image('empate', './static/assets/img/empate.png');
    this.load.tilemapTiledJSON('map', './static/assets/map/map.json');
  }

  //Carga de sprites en la escena
  loadSpritesheet() {
    this.load.spritesheet('explosion', './static/assets/sprites/explosion_sheet.png', {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 23
    });
  }

  //Carga de audios
  loadAudio() {
    this.load.audio('cannon_sound', './static/assets/audio/cannon_sound.mp3')
      .audio('torpedo_sound', ['./static/assets/audio/torpedo_sound.mp3'])
      .audio('start_game', ['./static/assets/audio/start_game.mp3'])
      .audio('sea_water', ['./static/assets/audio/sea_water.mp3'])
      .audio('ship_collision', ['./static/assets/audio/ship_destroy.mp3'])
      .audio('depth_charge', ['./static/assets/audio/depth_charge.mp3'])
      .audio('victory', ['./static/assets/audio/victory.mp3'])
      .audio('background', ['./static/assets/audio/menu.mp3'])
  }

  //Carga de audios en la escena
  loadAudioVariables() {
    this.sea_water = this.sound.add('sea_water');
    this.sea_water.loop = true;
    this.start_game = this.sound.add('start_game');
    this.cannon_sound = this.sound.add('cannon_sound');
    this.torpedo_sound = this.sound.add('torpedo_sound');
    this.ship_collision_sound = this.sound.add('ship_collision');
    this.depth_charge_sound = this.sound.add('depth_charge');
    this.victory_sound = this.sound.add('victory');
    this.bg_sound = this.sound.add('background');;
  }

  //Verifica si hay un ganador
  checkVictory() {
    /* La partida es ganada por un equipo cuando:
       --Gana-->
       -el destructor destruyó al submarino;
        -el submarino destruye al menos 4 cargueros
       - la mitad de cargueros llega al otro lado del mapa;
        -por cancelación de partida, considerando perdedor a quien cancela y gana su rival
       --Empte-->
            - por tiempo y no cumplo condicion de ganar
            - por choque de ambos barcos*/
    if (this.currentPlayers.children.entries[0].texture.key === 'submarino') {
      if (this.destructor2.destructor.is_destroyed && !this.submarino.submarino.is_destroyed) {
        console.log('gana el submarino');
        this.add.image(this.submarino.submarino.x, this.submarino.submarino.y, "victory");
        this.socket.emit('submarino_wins', {
          socketId: this.socket.id
        });
        this.bg_sound.play();
      }
    } else if (this.submarino2.submarino.is_destroyed && this.destructor.destructor.is_destroyed) {
      console.log('gana el destructor');
      this.add.image(this.destructor.destructor.x, this.destructor.destructor.y, "victory");
      this.socket.emit('destructor_wins', {
        socketId: this.socket.id
      });
      this.bg_sound.play();
    }
  }

  freightersWins() {
    if (this.currentPlayers.children.entries[0].texture.key === 'submarino') {
      console.log('gana el destructor');
      this.add.image(this.submarino.submarino.x, this.submarino.submarino.y, "defeat");
      this.socket.emit('carguero_wins', {
        socketId: this.socket.id,
      });
    } else {
      console.log('gana el destructor');
      this.add.image(this.destructor.destructor.x, this.destructor.destructor.y, "victory");
      this.socket.emit('carguero_wins', {
        socketId: this.socket.id,
      });
    }
  }
}

export default Game;