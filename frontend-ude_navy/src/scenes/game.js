class Game extends Phaser.Scene {
  constructor() {
      super('Game');
      console.log("Game cargdo");
  }

  showMap(){
    this.add.image(0, 0, 'mapa_principal').setOrigin(0, 0)
  }

  preload ()
  { 
    
      //this.load.html('nameform', './static/assets/html/loginform.html');
      //console.log("pregame preload");
  }

  create ()
  { 
    console.log("mapa");
    this.showMap();
  }
}

export default Game;