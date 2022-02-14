//imoprto archivos
import Submarino from "../objects/submarino.js";
import Carguero from "../objects/carguero.js";
import Destructor from "../objects/destructor.js";
import Bullets from "../objects/bullets.js"


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
    this.load.image('bullets', './static/assets/img/checkbox_unchecked.png');
  }

  showMap() {
    //this.add.image(0, 0, 'mapa_principal').setOrigin(0, 0);
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'mapa_principal').setOrigin(0, 0);
  }







  preload() {
    this.submarino = new Submarino(this);
    this.carguero = new Carguero(this);
    this.destructor = new Destructor(this);
    this.bullets = new Bullets(this);
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


  }

  update() {
    this.background.tilePositionY -= 0.3;
    this.submarino.moveSubmarino();
    this.destructor.moveDestructor();
  }
}

export default Game;