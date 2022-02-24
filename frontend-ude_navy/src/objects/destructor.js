class Destructor extends Phaser.GameObjects.Sprite {


  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.is_destroyed = false;
    this.setVisible(false);
  }

  create(coordenadas, self) {
    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
    //this.destructor.setBounce(1);
    this.destructor.setDisplaySize(180, 30);
    //this.destructor.setCollideWorldBounds(true);
    this.destructor.flipX = false;
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //this.destructor.setImmovable();
    console.log("Termino crear destructor");

    self.cameras.main.setBounds(0, 0, 3200, 1600);
    self.cameras.main.startFollow(this.destructor, true);
    self.cameras.main.roundPixels = true;

    self.cameras.main.setZoom(1);

  }

  get() {
    return this.destructor;
  }


  destroy() {
    this.destructor.destroy();
  }

  moveDestructor() {

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    if (this.destructor) {
      if (this.cursors.left.isDown) {
        this.destructor.setAngularVelocity(-100)
      } else if (this.cursors.right.isDown) {
        this.destructor.setAngularVelocity(100)
      } else {
        this.destructor.setAngularVelocity(0)
      }
      const velX = Math.cos((this.destructor.angle - 360) * 0.01745)
      const velY = Math.sin((this.destructor.angle - 360) * 0.01745)
      if (this.cursors.down.isDown) {
        this.destructor.setVelocityX(-200 * velX)
        this.destructor.setVelocityY(-200 * velY)
      } else if (this.cursors.up.isDown) {
        this.destructor.setVelocityX(100 * velX)
        this.destructor.setVelocityY(100 * velY)
      } else {
        this.destructor.setAcceleration(0)
        this.destructor.setVelocityY(0)
        this.destructor.setVelocityX(0)
      }
    }

  }
}

export default Destructor;