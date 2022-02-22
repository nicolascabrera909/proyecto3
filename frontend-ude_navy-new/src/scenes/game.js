//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero from "../objects/carguero.js";
import Destructor from "../objects/destructor.js";


class Game extends Phaser.Scene {

  /*Constructor de la clase Game, inicializo la clase*/
  constructor() {
    super('Game');
    console.log("Game cargado");
    this.cant_torpedos_enviados = 0;
    this.cant_canones_enviados = 0;
    this.games= {
        gameList:[],
    }
  }

  getVersion(){
    var url = 'http://localhost:3000/version';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

  showVersion(){
    this.version = this.getVersion();
    this.add.text(this.sys.game.config.width - 80, this.sys.game.config.height - 20, 'Version:' + this.version, { font: '10px Courier', fill: '#ffffff' })
  }

  /**Cargo la imagenes del juego*/
  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor1.png');
    this.load.image('submarino', './static/assets/img/submarino1.png');
    this.load.image('carguero', './static/assets/img/carguero1.png');
    this.load.image('mapa_principal', './static/assets/img/mapa.png');
    this.load.image('torpedo', './static/assets/img/torpedo.png');
    this.load.image('canon', './static/assets/img/cannon.png');

  }

  preload() {
    this.submarino = new Submarino(this, 0, 0, 'submarino');
    this.carguero = new Carguero(this, 10, 10, 'carguero');
    this.destructor = new Destructor(this);
    this.loadImages();
  }

  create() {
    // this.showVersion();
    var name = 'nico';///-> esto lo tengo que obtener del menu web
    var bandoBarcos = 'submarino'; //-->esto tambien tiene q venir de la web 
    var level = 1;
    var mapa = 1;
    var dificultad = 1;

    //Creo el mapa
    this.showMap();
    /*Seteo donde va a escuchar el socket, tambien obtengo el id del soket*/
    console.log('Me conecto al socket');
    this.socket = io("http://localhost:3000");
    //valido si la lista de juegos esta vacia o tiene un juego iniciado
    if (!(this.games.gameList.length > 0)) {
      console.log('Inicio Partida');
      //****si la lista tiene datos la partida esta iniciada, entramos aca******/
      //emito los datos al front
      this.socket.emit('createGame', name, bandoBarcos,  mapa, dificultad);
      console.log('Emit -> createGame');
      //obtengo la respuesta del socket desde el backend
      this.socket.on('listenerCreateGame', function (jsonGame) {
        console.log('Contenido de jsonGame:' + jsonGame);
        //convertir el json de los juegos q obtuve de la respuesta a un objeto que tiene la lista de juegos  
        this.games = JSON.parse(jsonGame);
        console.log('Converti a objeto el JSON'); 
        console.log('Los juegos:' + this.games.gameList[0].playerList[0].name);
        var coordenadas={
                      x:this.games.gameList[0].playerList[0].boatList[0].positionX,
                      y:this.games.gameList[0].playerList[0].boatList[0].positionY,
        }
        this.submarino.create(coordenadas);
      });
     
    } else {
      console.log('Me uno a partida');
      this.destructor.create();
      this.carguero.showCargueros();
      //creo los titulos de la cantidad de disparos realizados
      this.createTorpedoLabel();
      this.createCanonLabel();
    }

  };

  update() {
  }

  showMap() {
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'mapa_principal').setOrigin(0, 0);
  }

  /**Accion a tomar en caso de colicion de destructor y submarino */
  accionColision() {
    console.log('pego');
    this.submarino.destroy();
    this.destructor.destroy();
  }

  /**Obtener usuario, ver si se va a usar.
   * Ahora esta fijo
   */
  getUsersName() {
    // esto debe venir de la escena previa que es donde cargan sus datos
    return ['Pepe', 'Maria'];
  }

  /**Cargo el bando que selecciono el usuario */
  init(data) {
    this.option = data.option;
  }

}

export default Game;