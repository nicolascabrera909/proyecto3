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
    this.loadImages();
    this.loadTileMap();
  }

  create() {
    let self = this;

    console.log('***********************************+');
    


    /*Seteo donde va a escuchar el socket, tambien obtengo el id del soket*/
    console.log('Me conecto al socket');
    this.socket = io("http://localhost:3000");
    this.serverSocketHandshake(self);
    this.createMap();
    this.socket.emit('mapSize', 3200, 1600);
    this.createCountDown(1);

  }

  createCountDown(difficulty){
    this.initialTime = 300000;

    this.text = this.add.text(16, 300, 'Countdown: ' + this.formatTime(this.initialTime),  { font: "64px Arial", fill: "#ffffff", align: "center" });
    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    
  }

  formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}


onEvent ()
{
    this.initialTime -= 1; // One second
    this.text.setText(16, 300, 'Countdown: ' + this.formatTime(this.initialTime), { font: "64px Arial", fill: "#ffffff", align: "center" });
}

  update() {
    if (this.submarino !== undefined) {
      //this.submarino.moveSubmarino(this.socket);
    }
    if (this.destructor != undefined) {
      this.destructor.moveDestructor();
    }
    this.updateTorpedoStatics();
    this.updateCanonStatics();
    this.updateCargaStatics();

  
    //this.delayText.setText('Tiempo transcurrido: ' + this.delayedEvent.getProgress().toString().substr(0, 4));
  }

  //Socket metodos  
  serverSocketHandshake(self) {
    this.socket.on('inicioInstancia', function (jsonGame) {
      console.log('Evento inicioInstancia');
      this.games = JSON.parse(jsonGame);
    });

    //obtengo los parametros del html y se los paso al create
    if (!(this.games.gameList.length > 0)) {
      console.log('Obtengo datos pre-game.html');
      var username = this.urlParams.get('username');
      var boatType = this.urlParams.get('boattype');
      var difficulty = this.urlParams.get('dificultad');
      this.username = username
      if (this.games.gameList.length > 1) {
        console.log('***********Lista de jugadores completa ************')
      } else {
        console.log('Emito createGame');
        this.socket.emit('createGame', username, boatType, difficulty);
        this.listenForSocketEvents(self);
      }
      
    }
  }

  listenForSocketEvents(self) {
    this.socket.on('currentPlayers', function (game, players) {
      console.log('Evento currentPlayers');
      for(let i = 0; i < players.length; i++){
        if (players[i].socketId === self.socket.id) {
          self.createCurrentPlayer(self, game.gameList[0], players[i]);
        } else {
          self.createOtherPlayer(self, game.gameList[0], players[i] );
        }
      }
    });

    // Se genera a si mismo en la pantalla del oponente
    this.socket.on('newPlayer', function (game, player) {
      self.createOtherPlayer(self, game.gameList[0], player );
    });

    this.socket.on('playerDisconnected', function (socketID) {
      console.log('Evento playerDisconnected'+socketID );
    });

    this.socket.on('movimientoDetectadoSubmarino', () => {
      console.log('Evento movimientoDetectadoSubmarino');
    });

    this.socket.on('movimientoDetectadoDestructor', () => {
      console.log('Evento movimientoDetectadoDestructor');
    });

    this.socket.on('playerDisconnected', function (jsonGame) {
      console.log('Evento playerDisconnected');
    });
  }

  /*
  teniamos dos veces esta funcion con distinto orden de parametros
  createCurrentPlayer(self, player, gameList) {
    if (player.boatTeam == 'submarino') {
      self.crearSubmarino(self, gameList);
    } else {
      self.crearDestructor(self, gameList);
      self.crearCargueros(self, gameList);
    }
  }
  */

  createCurrentPlayer(self, gameList, player) {
    let cursor = true;
    if (player.boatTeam == 'submarino') {
      self.crearSubmarino(self, gameList, cursor);
    } else {
      self.crearDestructor(self, gameList, cursor);
      self.crearCargueros(self, gameList);
    }
  }

  createOtherPlayer(self, gameList, player) {
    let cursor = false;
    if (player.boatTeam == 'submarino') {
      self.crearSubmarino(self, gameList, cursor);
    } else {
      self.crearDestructor(self, gameList, cursor);
      self.crearCargueros(self, gameList);
    }
  }

  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor.png');
    this.load.image('submarino', './static/assets/img/submarino.png');
    this.load.image('carguero', './static/assets/img/freighters.png');
    this.load.image('torpedo', './static/assets/img/torpedo.png');
    this.load.image('canon', './static/assets/img/cannon.png');
    this.load.image('tiles', './static/assets/map/terrain.png');
    this.load.image('depth_charge', './static/assets/img/depthcharge.png')
    this.load.image('logo', './static/assets/img/logo.jpeg');
  }

  loadTileMap() {
    this.load.tilemapTiledJSON('map', './static/assets/map/map.json');
  }
  createMap() {
    this.map = new Map(this, 'map', 'tiles', 'terrain');
  }
  tiempoExcedido() {
    console.log('Aca habria que finalizar el juego');
  }
  crearSubmarino(self, gameList, cursor) {
    let index = 0;
    if (!gameList.playerList[0].boatTeam == 'submarino') {
      index = 1;
    }
    var coordinates = {
      x: gameList.playerList[index].boatList[0].positionX,
      y: gameList.playerList[index].boatList[0].positionY,
    }
    this.submarino = new Submarino(self, 0, 0, 'submarino');
    this.submarino.create(coordinates, self, cursor);
    this.createTorpedoLabel();
    this.createCanonLabel();
  }

  crearDestructor(self, gameList, cursor) {
    let index = 0;
    this.destructor = new Destructor(this);
    if (gameList.playerList[0].boatTeam == 'submarino') {
      index = 1;
    }
    var i = 0;
    var encontre = false;
    var coordinates = {
      x: 0,
      y: 0
    }
    while (i < gameList.playerList[index].boatList.length && !encontre) {
      if (gameList.playerList[index].boatList[i].type == 'destructor') {
        coordinates.x = gameList.playerList[index].boatList[i].positionX;
        coordinates.y = gameList.playerList[index].boatList[i].positionY;
        encontre = true;
      }
      i++;
    }
    this.destructor.create(coordinates, self, cursor);
    self.createUsuarioLabel()
    self.createCargaLabel();
    self.createCanonLabel();
    //self.addColisiones(self);
  }

  crearCargueros(self, gameList) {
    this.carguero = new Carguero(self, 0, 0, 'carguero');
    this.carguero.create(gameList);
  }

  /**Cargo el bando que selecciono el usuario */
  init(data) {
    this.option = data.option;
  }

  backButton() {
    var button = this.add.image(400, 300, 'logo').setInteractive();
    button.on('pointerup', openExternalLink(), this);
  }

  openExternalLink() {
    var tweet = 'I am testing a button from within a Phaser example';
    var url = 'http://localhost:5500/frontend-ude_navy/index.html';
    var s = window.open(url, '_blank');
    if (s && s.focus) {
      s.focus();
    }
    else if (!s) {
      window.location.href = url;
    }
  }

  //fisicas del juego

  addColisiones() {
    //this.physics.add.overlap(this.submarino, this.destructor, function(actual, rival  ) {
    //  actual.destroy(); 
    //})
  }
  /**Accion a tomar en caso de colicion de destructor y submarino */
  accionColision() {
    console.log('pego');
    this.submarino.destroy();
    this.destructor.destroy();
  }

  //  PARA LAS ESTADISTICAS DEL JUEGO 

  

  createUsuarioLabel() {
    this.username = this.add.text(16, 16, 'Jugador: ' + this.username, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });
      

  }

  createTorpedoLabel() {
    this.torpedos_quantity = this.add.text(150, 40, 'Torpedos: ' + this.cant_torpedos_enviados, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });
  }

  updateTorpedoStatics() {
    if (this.torpedos_quantity) {
      this.torpedos_quantity.setText("Torpedos: " + this.cant_torpedos_enviados);
    }
  }

  createCanonLabel() {
    this.canon_quantity = this.add.text(16, 40, 'Cañon: ' + this.cant_canones_enviados, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });
  }

  updateCanonStatics() {
    if (this.canon_quantity) {
      this.canon_quantity.setText("Cañon: " + this.cant_canones_enviados);
    }
  }

  createCargaLabel() {
    this.carga_quantity = this.add.text(150, 40, 'Carga: ' + this.cant_cargas_enviadas, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });
  }

  updateCargaStatics() {
    if (this.carga_quantity) {
      this.carga_quantity.setText("Carga: " + this.cant_cargas_enviadas);
    }
  }
}

export default Game;