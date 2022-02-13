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
    this.add.image(0, 0, 'mapa_principal').setOrigin(0, 0);
  }

  showSubmarino(){
      //this.add.image(this.sys.game.config.width -480, this.sys.game.config.height -220, 'submarino').setDisplaySize(50, 10);
    var randomX = Phaser.Math.Between(400, this.sys.game.config.width-50);
    var randomY = Phaser.Math.Between(50, this.sys.game.config.height-50);
    this.add.image(randomX, randomY, 'submarino').setDisplaySize(50, 10).flipX=true;
  }
  
  showDestructor(){
    //this.add.image(this.sys.game.config.width -480, this.sys.game.config.height -250, 'destructor').setDisplaySize(37, 13).setOrigin(-5, -3);
    var randomX = Phaser.Math.Between(50, 300);
    var randomY = Phaser.Math.Between(50, this.sys.game.config.height-50);
    this.add.image(randomX, randomY, 'destructor').setDisplaySize(50, 10);
  }

  showCargueros(){
    var randomX = Phaser.Math.Between(50, 200);
    var randomY = Phaser.Math.Between(50, this.sys.game.config.height-50);
    let x=0;
    let y=0;
    let i=0;
    for (i; i < 3; i++) {
      //this.add.image(this.sys.game.config.width -270, this.sys.game.config.height -230, 'carguero').setDisplaySize(19, 7).setOrigin(-x, -y);  
      this.add.image(randomX, randomY, 'carguero').setDisplaySize(19, 7).setOrigin(x, y);  
      y=y+2;
    }
    x=x-2;
    y=y-2;
    for (i; i > 0; i--) {
      //this.add.image(this.sys.game.config.width -270, this.sys.game.config.height -200, 'carguero').setDisplaySize(19, 7).setOrigin(-x, -y);
      this.add.image(randomX, randomY, 'carguero').setDisplaySize(19, 7).setOrigin(x, y);
      y=y-2;
    }
  }

  preload ()
  { 
    this.loadImages();
      //this.load.html('nameform', './static/assets/html/loginform.html');
    console.log("Game preload");
  }

  create ()
  { 
    console.log("mapa");
    this.showMap();
    this.showDestructor();
    this.showSubmarino();
    this.showCargueros();
  }
}

export default Game;