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

  preload() {
    this.submarino = new Submarino(this, 0, 0, 'submarino');
    this.carguero = new Carguero(this, 10, 10, 'carguero');
    this.destructor = new Destructor(this);
    this.loadImages();


    //-----> ver que hacer con lo comentado
    //let users = [];
    //this.users = this.getUsersName();
    //this.bullets = new Bullets(this);
    //this.load.html('nameform', './static/assets/html/loginform.html');

  }

  create() {
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
/*
      {"gameList":[{"playerList":[{"name":"nico",
                                  "boatList":[{"depth":1,
                                              "torpedo":{"power":100,"distance":100,"cantMunicion":30},
                                              "cannon":{"power":100,"distance":100,"cantMunicion":30},
                                              "positionX":323.5360409903175,
                                              "positionY":145.63515830844585,
                                              "boatLife":100,
                                              "visibility":100}],
                                  "socketId":"UqBw3d12GguKEkC-AAAB"}],
                      "idMap":1,
                      "idDifficulty":1}]}*/
     
    } else {
      console.log('Me uno a partida');
      this.destructor.create();
      this.carguero.showCargueros();
      //creo los titulos de la cantidad de disparos realizados
      this.createTorpedoLabel();
      this.createCanonLabel();
    }

    /* [{ "playerList": [{ "name": "nico", 
                         "boatList": [{ "depth": 1, 
                                         "torpedo": { "power": 100, "distance": 100, "cantMunicion": 30 }, 
                                         "cannon": { "power": 100, "distance": 100, "cantMunicion": 30 }, 
                                         "positionX": 149.24414571461799, "positionY": 296.181080834839, 
                                         "boatLife": 100, 
                                         "visibility": 100, 
                                         "dificultad": 1 }]
                         , "socketId": "QN0AwoNjq8exrrf7AAAB" }]
                         , "idMap": 1, 
                         "idDifficulty": 1 }]*/

    /*this.socket.on('newPlayer', function (playerInfo) {
      addOtherPlayers(self, playerInfo)
    });

    this.socket.on('playerDisconnected', function (playerId) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy()
        }
      })
    });*/

  };

  

  //configuro las coliciones de los elementos entre si y los limites del mapa
  //this.physics.world.setBoundsCollision(true, true, true, true);
  //this.physics.add.collider(this.submarino.get(), this.destructor.get(), this.accionColision, null, this);
  //console.log(this.option);



  //--------------> ver que hacer con estos comentarios
  /*
  console.log("mapa");
  this.showMap();
  this.destructor.showDestructor();
  this.submarino.showSubmarino();
  this.carguero.showCargueros();
 //this.destructor.moveDestructor();
  */
  //this.physics.add.collider(this.torpedo.get(),/ this.destructor.get(), this.algo, null, this);
  //this.updateCamera();
  //this.cursors = this.input.keyboard.createCursorKeys();
  //this.sys.game.cameras.setBounds(0,0, this.sys.game.config.width, this.sys.game.config.height);
  //this.sys.game.cameras.main.startFollow(this.submarino);


  update() {
   // this.background.tilePositionY -= 0.3;
    //movimientos  de sumarino y destructor
    //this.submarino.moveSubmarino();
    //this.destructor.moveDestructor();
    //actualiza los lanzamientos de torpedos y cañones
    //this.updateTorpedoStatics();
    //this.updateCanonStatics();

    //----------> ver que hacer con el comentario, se borra
    //this.sys.game.cameras.follow(this.submarino,false); 


  }

  /**Cargo la imagenes del juego*/
  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor1.png');
    this.load.image('submarino', './static/assets/img/submarino1.png');
    this.load.image('carguero', './static/assets/img/carguero1.png');
    this.load.image('mapa_principal', './static/assets/img/mapa_principal.png');
    this.load.image('torpedo', './static/assets/img/torpedo.png');
    this.load.image('canon', './static/assets/img/cannon.png');

  }
  /**Cargo el mapa */
  showMap() {
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'mapa_principal').setOrigin(0, 0);


    /**Ejemplo
  
    // create the map
    this.map = this.make.tilemap({
      key: 'map'
    });
  
    // first parameter is the name of the tilemap in tiled
    var tiles = this.map.addTilesetImage('spritesheet', 'tiles', 16, 16, 1, 2);
  
    // creating the layers
    this.map.createStaticLayer('Grass', tiles, 0, 0);
    this.map.createStaticLayer('Obstacles', tiles, 0, 0);
  
    // don't go out of the map
    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;
  
    //Fin Ejemplo*/

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

  // camera() {
  //   // limit camera to map
  //   this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  //   this.cameras.main.startFollow(this.player);
  //   this.cameras.main.roundPixels = true; // avoid tile bleed
  // }





  /////////////////////////////7 PARA LAS ESTADISTICAS DEL JUEGO ///////////////////////////
/*
  createTorpedoLabel() {
    this.torpedos_quantity = this.add.text(16, 16, 'Torpedos: ' + this.cant_torpedos_enviados, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });

  }

  updateTorpedoStatics() {
    this.torpedos_quantity.setText("Torpedos: " + this.cant_torpedos_enviados);
  }

  createCanonLabel() {
    this.canon_quantity = this.add.text(16, 40, 'Cañon: ' + this.cant_canones_enviados, {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'verdana, arial, sans-serif'
    });

  }

  updateCanonStatics() {
    this.canon_quantity.setText("Cañon: " + this.cant_canones_enviados);
  }
*/
  /////////////////////FIN PARA LAS ESTADISTICAS ///////////////////////////7


}


export default Game;