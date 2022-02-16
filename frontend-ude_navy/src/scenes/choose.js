class Choose extends Phaser.Scene {
  constructor() {
    super('Choose');
    console.log("Choose cargado");
  }

  init() {

  }

  loadImages() {
    this.load.image('destructor', './static/assets/img/destructor1.png');
    this.load.image('submarino', './static/assets/img/submarino1.png');
    this.load.image('background', './static/assets/img/background.png');
  }

  loadBackground(){
    this.add.image(0, 0, 'background').setOrigin(0, 0);
  }

  preload() {
    this.loadImages();
  }

  create() {
    // /this.loadBackground();
    var destructor = this.add.sprite(250, 200, "destructor").setInteractive().setScale(0.18,0.18);
    this.optionsText = this.add.text(230, 220, 'Alianza', { fontSize: '15px', fill: '#fff' });

    var submarino = this.add.sprite(550, 200, "submarino").setInteractive().setScale(0.18,0.18);
    this.optionsText = this.add.text(530, 220, 'Eje', { fontSize: '15px', fill: '#fff' });

    destructor.on("pointerdown", () => {
      this.scene.start("Game", {option: "destructor"});
    });

    submarino.on("pointerdown", () => {
      this.scene.start("Game", {option: "submarino"});
    });      
  }

  update() {

  };

}

export default Choose;