//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero from "../objects/carguero.js";
import Destructor from "../objects/destructor.js";
//import Bullets from "../objects/bullets.js";


class Game extends Phaser.Scene {
  constructor() {
    super('Game');
    console.log("Game cargado");
    
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
  }

  showMap() {
    //this.add.image(0, 0, 'mapa_principal').setOrigin(0, 0);
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'mapa_principal').setOrigin(0, 0);
  }

  choca() {
    this.score++;
    console.log("choco submarino");
  }
/*
  algoPasa(carguero,defensa){
    console.log("algo pasa");
  }
  init() {
    this.score = 0;
  }*/

  




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
    console.log("mapa");
    this.showMap();
    this.destructor.showDestructor();
    this.submarino.showSubmarino();
    this.carguero.showCargueros();
   //this.destructor.moveDestructor();
 
 
   //marcador del juego
    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { 
      fontSize: '20px', 
      fill: '#fff', 
      fontFamily: 'verdana, arial, sans-serif' 
    });

    
    //fisicas del juego
   // this.physics.add.collider(this.carguero, this.submarino, this.choca ,null,this);    
    this.physics.add.collider(this.submarino,this.carguero,this.choca,null,this);

    //this.submarino.chocarSumarino(this.submarino,this.carguero);
  


  }

  update() {
    //let cursors = this.input.keyboard.createCursorKeys();
    this.background.tilePositionY -= 0.3;
    this.submarino.moveSubmarino();
    //this.destructor.moveDestructor();
    //this.bullets.shootBullets(this.submarino);
  }

 
}


export default Game;