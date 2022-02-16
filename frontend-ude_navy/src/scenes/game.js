//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero from "../objects/carguero.js";
import Destructor from "../objects/destructor.js";
//import Bullets from "../objects/bullets.js";


class Game extends Phaser.Scene {
  constructor() {
    super('Game');
    console.log("Game cargado");
    this.score_value = 0
    this.cant_torpedos_enviados = 0;
    this.cant_canones_enviados = 0; 
  }

  init() {
  
  }

  getUsersName() {
    // esto debe venir de la escena previa que es donde cargan sus datos
    return ['Pepe', 'Maria'];
  }

  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor1.png');
    this.load.image('submarino', './static/assets/img/submarino1.png');
    this.load.image('carguero', './static/assets/img/carguero1.png');
    this.load.image('mapa_principal', './static/assets/img/mapa_principal.png');
    this.load.image('torpedo', './static/assets/img/torpedo.png');
    this.load.image('canon', './static/assets/img/cannon.png');

  }

  showMap() {
    //this.add.image(0, 0, 'mapa_principal').setOrigin(0, 0);
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'mapa_principal').setOrigin(0, 0);
 
   //Ejemplo
    
    // create the map
    // this.map = this.make.tilemap({
    //   key: 'map'
    // });
    
    // first parameter is the name of the tilemap in tiled
    // var tiles = this.map.addTilesetImage('spritesheet', 'tiles', 16, 16, 1, 2);
    
    // creating the layers
    // this.map.createStaticLayer('Grass', tiles, 0, 0);
    // this.map.createStaticLayer('Obstacles', tiles, 0, 0);
    
    // don't go out of the map
    // this.physics.world.bounds.width = this.map.widthInPixels;
    // this.physics.world.bounds.height = this.map.heightInPixels;
    
    //Fin Ejemplo
  
  }

  // camera() {
  //   // limit camera to map
  //   this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  //   this.cameras.main.startFollow(this.player);
  //   this.cameras.main.roundPixels = true; // avoid tile bleed
  // }

  choca() {
    this.score++;
    console.log("choco submarino");
  }

  init(data){
    this.option = data.option;
  }

  preload() {
    this.submarino = new Submarino(this,0,0,'submarino');
    this.carguero = new Carguero(this,10,10,'carguero');
    this.destructor = new Destructor(this);
    //this.bullets = new Bullets(this);
    this.loadImages();
    //this.load.html('nameform', './static/assets/html/loginform.html');
    let users = [];
    this.users = this.getUsersName();
  }

  create() {
    //Listen for web socket events
    this.socket = io("http://localhost:3000");
    this.socket.on('currentPlayers', function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === this.socket.id) {
          if(this.option == 'submarino'){
            console.log("Es submarino");
            //this.submarino.create(players[id].playerId);
          }
          else
          this.destructor.create(players[id]);
        } else {
          //this.addOtherPlayers(players[id]);
        }
      }.bind(this));
    }.bind(this));
    this.socket.on('newPlayer', function (playerInfo) {
      //this.addOtherPlayers(playerInfo);
    }.bind(this));

    /*
    console.log("mapa");
    this.showMap();
    this.destructor.showDestructor();
    this.submarino.showSubmarino();
    this.carguero.showCargueros();
   //this.destructor.moveDestructor();
    */

    //this.updateCamera();
    //this.cursors = this.input.keyboard.createCursorKeys();
    this.showMap();
    console.log(this.option);
    this.carguero.showCargueros();
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.submarino.create();
    this.destructor.create();
    this.physics.add.collider(this.submarino.get(), this.destructor.get(), this.algo, null, this);
    //this.physics.add.collider(this.torpedo.get(),/ this.destructor.get(), this.algo, null, this);
    this.destructor.moveDestructor();
    this.createTorpedoLabel();
    this.createCanonLabel();

    //this.sys.game.cameras.setBounds(0,0, this.sys.game.config.width, this.sys.game.config.height);
    //this.sys.game.cameras.main.startFollow(this.submarino);


 
   //marcador del juego
    
    



  }

  




  algo(){
    console.log('pego');
    this.submarino.destroy();
    this.destructor.destroy();
  }



  /////////////////////////////7 PARA LAS ESTADISTICAS DEL JUEGO ///////////////////////////

  createTorpedoLabel(){
    this.torpedos_quantity = this.add.text(16, 16, 'Torpedos: ' + this.cant_torpedos_enviados, { 
      fontSize: '20px', 
      fill: '#fff', 
      fontFamily: 'verdana, arial, sans-serif' 
    });

  }

  updateTorpedoStatics() {
    this.torpedos_quantity.setText("Torpedos: " + this.cant_torpedos_enviados);
  }

  createCanonLabel(){
    this.canon_quantity = this.add.text(16, 40, 'Cañon: ' + this.cant_canones_enviados, { 
      fontSize: '20px', 
      fill: '#fff', 
      fontFamily: 'verdana, arial, sans-serif' 
    });

  }

  updateCanonStatics() {
    this.canon_quantity.setText("Cañon: " + this.cant_canones_enviados);
  }

  /////////////////////FIN PARA LAS ESTADISTICAS ///////////////////////////7



  update() {
    this.background.tilePositionY -= 0.3;
    this.submarino.moveSubmarino();
    this.updateTorpedoStatics();
    this.updateCanonStatics();

    

    //this.sys.game.cameras.follow(this.submarino,false); 


  }

 
}


export default Game;