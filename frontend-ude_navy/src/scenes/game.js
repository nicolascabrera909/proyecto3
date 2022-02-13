//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero  from "../objects/carguero.js";


class Game extends Phaser.Scene {
  constructor() {
      super('Game');
      console.log("Game cargado");
  }
  

  loadImages(){
    this.load.image('destructor', './static/assets/img/destructor1.png');
    this.load.image('submarino', './static/assets/img/submarino1.png');
    this.load.image('carguero', './static/assets/img/carguero1.png');
    this.load.image('mapa_principal', './static/assets/img/mapa_principal.png');
  }

  showMap(){
    //this.add.image(0, 0, 'mapa_principal').setOrigin(0, 0);
    this.background=this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'mapa_principal').setOrigin(0, 0);
  }

  

  showDestructor(){
    //this.add.image(this.sys.game.config.width -480, this.sys.game.config.height -250, 'destructor').setDisplaySize(37, 13).setOrigin(-5, -3);
    var randomX = Phaser.Math.Between(50, 300);
    var randomY = Phaser.Math.Between(50, this.sys.game.config.height-50);
    this.add.image(randomX, randomY, 'destructor').setDisplaySize(50, 10);
  }

  

  preload ()
  { 
    this.submarino = new Submarino(this);
    this.carguero = new Carguero(this);
    this.loadImages();
      //this.load.html('nameform', './static/assets/html/loginform.html');
    console.log("Game preload");
  }

  create ()
  { 
    console.log("mapa");
    this.showMap();
    this.showDestructor();
    this.submarino.showSubmarino();
    this.carguero.showCargueros();
    this.submarino.moveSubmarino();
   // this.carguero.moveCarguero();
  }

  update(){
    this.background.tilePositionY -= 0.3;
  }
}

export default Game;