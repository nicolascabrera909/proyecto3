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
    this.cant_cargas_enviadas = 0;

    this.games = {
      gameList: [],
    }
    this.submarino;
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString);
    this.username = '';

    this.delayText;

  }

  preload() {

    this.carguero = new Carguero(this, 10, 10, 'carguero');
    this.destructor = new Destructor(this);
    this.loadImages();


    /*this.games= {   ----> aca hay q crear una escucha para q carge  
      gameList:[],          la lista de juegos del backend, por q sino la lista esa siempre 
                            queda vacia cada vez q inicia la scena de phaser.
                            
  }*/

  }

   
 
  
  

  create() {
    let self = this;
    //Creo el mapa
    this.showMap();

    this.delayText = this.add.text(400, 16);
    this.delayedEvent = this.time.delayedCall(60000, this.fin, [], this);

    /*Seteo donde va a escuchar el socket, tambien obtengo el id del soket*/
    console.log('Me conecto al socket');
    this.socket = io("http://localhost:3000");
    this.serverSocketHandshake(self);
  };

  fin()
    {
      console.log('FIN DEL TIEMPO')
    }

  

  serverSocketHandshake(self) {
    this.socket.on('inicioInstancia', function (jsonGame) {
      this.games = JSON.parse(jsonGame);
    });

    if (!(this.games.gameList.length > 0)) {

      var mapa = 1;
      var username = this.urlParams.get('username');
      var bandoBarcos = this.urlParams.get('boattype');
      var dificultad = this.urlParams.get('dificultad');
      this.username = username
      if(this.games.gameList.length>1){
        console.log('***********Lista de jugadores completa ************')
      }else{
        this.socket.emit('createGame', username, bandoBarcos, mapa, dificultad);
        this.listenForSocketEvents(self, bandoBarcos);///--> nose si esta bien que este aca, el emit del back dispara el on listenerCreateGame
      }
      
    }
  }

  listenForSocketEvents(self, /*bandoBarcos*/) {
    this.socket.on('listenerCreateGame', function (jsonGame) {
      this.games = JSON.parse(jsonGame);
      var bandoBarcos='submarino'
      /*
        SEGUIR ACA QUE ESTA MAL
      */ 
      self.createUsuarioLabel();
      if (this.games.gameList[0].playerList[0].boatTeam == bandoBarcos) {
        self.crearSubmarino(self, this.games.gameList);
        //self.crearDestructor(self, this.games.gameList);
      } else {
        console.log("***** En el else de listenForSocketEvents *****")
        self.crearDestructor(self, this.games.gameList);
        self.crearcargueros(self, this.games.gameList);
        
      }

    });

  }

  crearSubmarino(self, gameList) {
    var coordenadas = {
      x: gameList[0].playerList[0].boatList[0].positionX,
      y: gameList[0].playerList[0].boatList[0].positionY,
    }
    this.submarino = new Submarino(self, 0, 0, 'submarino');
    this.submarino.create(coordenadas);
    this.createTorpedoLabel();
    this.createCanonLabel();
    
    

    //self.addColisiones(self);
  }

  crearDestructor(self, gameList) {
    //TODO: TRAER DEL BACJK
    var coordenadas = {
      x: 500,
      y: 600,
    }
    this.destructor = new Destructor(self, 0, 0, 'destructor');
    this.destructor.create(coordenadas);
    this.createCargasLabel();
    this.createCanonLabel();
    //self.addColisiones(self);
  }
  crearcargueros(self, gameList) {
    //TODO: TRAER DEL BACJK
    var coordenadas = {
      x: 123,
      y: 600,
    }
    this.carguero = new Carguero(self, 0, 0, 'carguero');
    //this.carguero.create(coordenadas);
  }

  addColisiones() {
    //this.physics.add.overlap(this.submarino, this.destructor, function(actual, rival  ) {
    //  actual.destroy(); 
    //})
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
    if (this.submarino !== undefined) {
      this.submarino.moveSubmarino();
    }
    
    if (this.destructor != undefined) {
      this.destructor.moveDestructor();
    }
    /*
    if(this.destructor !== undefined ){
      this.destructor.moveDestructor();
    }
    */

    this.background.tilePositionY -= 0.3;

    this.updateTorpedoStatics();
    this.updateCanonStatics();
    this.updateCargaStatics();

    this.delayText.setText('Tiempo transcurrido: ' + this.delayedEvent.getProgress().toString().substr(0, 4));

   
    

    //----------> ver que hacer con el comentario, se borra
    //this.sys.game.cameras.follow(this.submarino,false); 


  }

  /**Cargo la imagenes del juego*/
  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor.png');
    this.load.image('submarino', './static/assets/img/submarino.png');
    this.load.image('carguero', './static/assets/img/carguero1.png');
    this.load.image('mapa_principal', './static/assets/img/water_background.png');
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
    if(this.torpedos_quantity){
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
    if(this.canon_quantity){
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
    if(this.carga_quantity){
      this.carga_quantity.setText("Carga: " + this.cant_cargas_enviadas);
    }
    
  }

  /////////////////////FIN PARA LAS ESTADISTICAS ///////////////////////////7


}


export default Game;
