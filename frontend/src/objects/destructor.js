import DepthCharge from "./depth_charge.js";
import Cannons from "./cannons.js";

class Destructor extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.is_destroyed = false;
    this.setVisible(false);
    this.coodOriginalX = 0;
    this.coodOriginalY = 0;
    this.rotationOriginal = 0;
    this.body.position.x = x;
    this.body.position.y = y;
    this.depthCharge = new DepthCharge(scene, x, y);
    this.cannons = new Cannons(scene);
    this.life = 5;
  }

  create(coordenadas, self, cursor) {
    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
    this.destructor.setCollideWorldBounds(true);
    this.destructor.setDisplaySize(100, 20);
    this.destructor.setSize(140, 20);
    this.destructor.flipX = false;
    if (cursor) {
      console.log("Termino crear destructor");
      self.cameras.main.setBounds(0, 0, 1344, 704);
      self.cameras.main.startFollow(this.destructor, true);
      self.cameras.main.roundPixels = true;
      self.cameras.main.setZoom(1.5);
      this.keySPACEBAR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.keyENTER = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    this.destructor.setImmovable(true);

    return this.destructor;

  }

  get() {
    return this.destructor;
  }

  destroy(socket, self) {
    this.destructor.destroy();
    this.destructor.is_destroyed = true;
    if (socket) {
      socket.emit('destroy_destructor', { socketId: socket.id });
    }
  }

  moveDestructor(cursors, socket, input, self, target) {
    if (!this.destructor.is_destroyed) {
      if (cursors.left.isDown) {
        this.destructor.setAngularVelocity(-120)
      } else if (cursors.right.isDown) {
        this.destructor.setAngularVelocity(120)
      } else {
        this.destructor.setAngularVelocity(0)
      }
      const velX = Math.cos((this.destructor.angle - 360) * 0.01745)
      const velY = Math.sin((this.destructor.angle - 360) * 0.01745)
      if (cursors.down.isDown) {
        this.destructor.setVelocityX(-300 * velX)
        this.destructor.setVelocityY(-300 * velY)
      } else if (cursors.up.isDown) {
        this.destructor.setVelocityX(300 * velX)
        this.destructor.setVelocityY(300 * velY)
      } else if (Phaser.Input.Keyboard.JustDown(this.keySPACEBAR)) {
        this.cannons.fireCannons(this.destructor.x, this.destructor.y, socket, target, 'destructor');
      } else if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
        this.depthCharge.fireDepthCharge(this.destructor.x, this.destructor.y, socket, self);
      } else {
        this.destructor.setAcceleration(0)
        this.destructor.setVelocityY(0)
        this.destructor.setVelocityX(0)
      }
      /*var x = this.destructor.x
      var y = this.destructor.y
      var r = this.destructor.rotation*/
      /*if (this.destructor.oldPosition && (x !== this.destructor.oldPosition.x || y !== this.destructor.oldPosition.y || r !== this.destructor.oldPosition.rotation)) {
        socket.emit('playerMovement', { x: this.destructor.x, y: this.destructor.y, rotation: this.destructor.rotation })
      }
      this.destructor.oldPosition = {
        x: this.destructor.x,
        y: this.destructor.y,
        rotation: this.destructor.rotation
      }*/
      if (!(this.destructor.coodOriginalX == this.destructor.x &&
        this.destructor.coodOriginalY == this.destructor.y &&
        this.destructor.rotationOriginal == this.destructor.rotation)) {
        socket.emit('playerMovement', { x: this.destructor.x, y: this.destructor.y, rotation: this.destructor.rotation })
        this.destructor.coodOriginalX = this.destructor.x;
        this.destructor.coodOriginalY = this.destructor.y;
        this.destructor.rotationOriginal = this.destructor.rotation;
      }
    }
  }
}

export default Destructor;