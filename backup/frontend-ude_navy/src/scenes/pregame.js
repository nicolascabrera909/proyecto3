class PreGame extends Phaser.Scene {
  constructor() {
      super('PreGame');
      console.log("pregame");
  }

  preload ()
  {
      this.load.html('nameform', './static/assets/html/loginform.html');
      console.log("pregame preload");
  }

  create ()
  { 
      
  }
}

export default PreGame;