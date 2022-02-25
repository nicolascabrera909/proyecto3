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

    this.submarino;
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.username = '';

    this.delayText;
    this.input;

  }

  /**Cargo la imagenes del juego*/
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

  preload() {

    this.carguero = new Carguero(this, 10, 10, 'carguero');
    this.destructor = new Destructor(this);
    this.loadImages();
    this.loadTileMap();

  }



  create() {
    let self = this;
    this.delayText = this.add.text(400, 16);
    this.delayedEvent = this.time.delayedCall(3000, this.tiempoExcedido, [], this);

    /*Seteo donde va a escuchar el socket, tambien obtengo el id del soket*/
    console.log('Me conecto al socket');
    this.socket = io("http://localhost:3000");
    this.serverSocketHandshake(self);
    this.createMap();
    this.socket.emit('mapSize', 3200, 1600);

  }


  update() {
    if (this.submarino !== undefined) {
      this.submarino.moveSubmarino(this.input, this.socket);

    }
    if (this.destructor != undefined) {
      this.destructor.moveDestructor();
      //this.socket.emit('movimientoDestructor');
    }
    /*
    if(this.destructor !== undefined ){
      this.destructor.moveDestructor();
    }
    */
    this.updateTorpedoStatics();
    this.updateCanonStatics();
    this.updateCargaStatics();

    this.delayText.setText('Tiempo transcurrido: ' + this.delayedEvent.getProgress().toString().substr(0, 4));




    //----------> ver que hacer con el comentario, se borra
    //this.sys.game.cameras.follow(this.submarino,false); 


  }


  //////////////////////////////////////////////////  Socket metodos  //////////////////////////////////////////////////////////////

  serverSocketHandshake(self) {
    this.socket.on('inicioInstancia', function (jsonGame) {
      this.games = JSON.parse(jsonGame);
    });

    if (!(this.games.gameList.length > 0)) {

      var username = this.urlParams.get('username');
      var bandoBarcos = this.urlParams.get('boattype');
      var dificultad = this.urlParams.get('dificultad');
      this.username = username
      if (this.games.gameList.length > 1) {
        console.log('***********Lista de jugadores completa ************')
      } else {
        this.socket.emit('createGame', username, bandoBarcos, dificultad);
        this.listenForSocketEvents(self, bandoBarcos);
      }

    }
  }


  listenForSocketEvents(self, bandoBarcos) {



    //Espero por confirmacion de inicio de juego por parte del backend
    this.socket.on('listenerCreateGame', function (jsonGame) {
      
      this.games = JSON.parse(jsonGame);
      //valido si si la partida esta completa, si no entro
      if ( this.games.gameList.length > 0) {
        self.createUsuarioLabel();
        if (bandoBarcos == 'submarino') {
          self.crearSubmarino(self, this.games.gameList);
        } else {
          self.crearDestructor(self, this.games.gameList);
          self.crearCargueros(self, this.games.gameList);
        }
      }else{
        backButton();
      }




    });

    this.socket.on('playerDisconnected', function (socketID) {
      console.log('Rival disconnected' + socketID);


    });

    this.socket.on('movimientoDetectadoSubmarino', () => {
      console.log('Submarino en movimiento ---------');
    });

    this.socket.on('movimientoDetectadoDestructor', () => {
      console.log('Destructor en movimiento!!!!!!!!!');
    });

    // espero evento de desconexion de usuario por parte del backend
    this.socket.on('playerDisconnected', function (jsonGame) {


    });





  }




  //////////////////////////////////////////////////  Cargo elementos en el mapa y config del mismo  //////////////////////////////////////////////////////////////
  loadTileMap() {
    this.load.tilemapTiledJSON('map', './static/assets/map/map.json');
  }
  createMap() {
    this.map = new Map(this, 'map', 'tiles', 'terrain');
  }
  tiempoExcedido() {
    console.log('Aca habria que finalizar el juego');
  }
  crearSubmarino(self, gameList) {
    let indice = 0;
    if (!gameList[0].playerList[0].boatTeam == 'submarino') {
      indice = 1;
    }
    var coordenadas = {
      x: gameList[0].playerList[indice].boatList[0].positionX,
      y: gameList[0].playerList[indice].boatList[0].positionY,
    }
    this.submarino = new Submarino(self, 0, 0, 'submarino');
    this.submarino.create(coordenadas, self);
    this.createTorpedoLabel();
    this.createCanonLabel();



    //self.addColisiones(self);
  }

  crearDestructor(self, gameList) {
    let indice = 0;
    if (gameList[0].playerList[0].boatTeam == 'submarino') {
      indice = 1;
    }
    var i = 0;
    var encontre = false;
    var coordenadas = {
      x: 0,
      y: 0
    }
    while (i < gameList[0].playerList[indice].boatList.length && !encontre) {
      if (gameList[0].playerList[indice].boatList[i].type == 'destructor') {
        coordenadas.x = gameList[0].playerList[indice].boatList[i].positionX;
        coordenadas.y = gameList[0].playerList[indice].boatList[i].positionY;
        encontre = true;
      }
      i++;
    }
    //this.destructor = new Destructor(self, 0, 0, 'destructor');
    this.destructor.create(coordenadas, self);
    //this.createCargasLabel();
    //this.createCanonLabel();
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

  backButton(){
    var button = this.add.image(400, 300, 'logo').setInteractive();
    button.on('pointerup', openExternalLink(), this);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







  /////////////////////////////////////////////////////////  Metodos complementarios  /////////////////////////////////////////
  //hoy no se usa, si mas adelante no se usa lo borramos
  
 openExternalLink ()
{
    var tweet = 'I am testing a button from within a Phaser example';

    var url = 'http://localhost:5500/frontend-ude_navy/index.html';

    var s = window.open(url, '_blank');

    if (s && s.focus)
    {
        s.focus();
    }
    else if (!s)
    {
        window.location.href = url;
    }
}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  //////////////////////////////////////////////////  fisicas del juego   //////////////////////////////////////////////////////////////

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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






  /////////////////////////////////////////////  PARA LAS ESTADISTICAS DEL JUEGO  ////////////////////////////////////////////////

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
    this.carga_quantity = this.add.text(16, 40, 'Carga: ' + this.cant_cargas_enviadas, {
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7


}


export default Game;
