import DepthCharges from "./depth_charges.js";
import Cannons from "./cannons.js";

class Destructor extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type, dificulty) {
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
    this.depthCharges = new DepthCharges(scene);
    this.cannons = new Cannons(scene);
    this.life = (12 / dificulty);
  }

  create(coordenadas, self, cursor) {
    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
    this.destructor.setCollideWorldBounds(true);
    this.destructor.setDisplaySize(100, 20);
    this.destructor.setSize(140, 20);
    this.destructor.flipX = false;
    this.coodOriginalX = randomX;
    this.coodOriginalY = randomY;
    this.rotationOriginal = 0;
    if (cursor) {
      self.cameras.main.setBounds(0, 0, 3200, 1120);
      self.cameras.main.startFollow(this.destructor, true);
      self.cameras.main.roundPixels = true;
      self.cameras.main.setZoom(1);

      self.smallCamera = self.cameras.add(1000, 10, 500, 400);
      self.smallCamera.rotation = 0;
      self.smallCamera.zoom = 0.1;
      self.smallCamera.setBounds(0, 0, 200, 200);

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
    self.anims.create(self.explosionConfig);
    self.add.sprite(this.destructor.x, this.destructor.y, 'explosion').play('explodeAnimation');
    self.ship_collision_sound.play();
    if (socket) {
      socket.emit('destroy_destructor', {
        socketId: socket.id
      });
    }
  }

  moveDestructor(cursors, socket, input, self, target) {
    if (!this.destructor.is_destroyed) {
      if (cursors.left.isDown) {
        this.destructor.setAngularVelocity(-80)
      } else if (cursors.right.isDown) {
        this.destructor.setAngularVelocity(80)
      } else {
        this.destructor.setAngularVelocity(0)
      }
      const velX = Math.cos((this.destructor.angle - 360) * 0.01745)
      const velY = Math.sin((this.destructor.angle - 360) * 0.01745)
      if (cursors.down.isDown) {
        this.destructor.setVelocityX(-80 * velX)
        this.destructor.setVelocityY(-80 * velY)
      } else if (cursors.up.isDown) {
        this.destructor.setVelocityX(100 * velX)
        this.destructor.setVelocityY(100 * velY)
      } else if (Phaser.Input.Keyboard.JustDown(this.keySPACEBAR)) {
        var angle = Phaser.Math.DegToRad(this.destructor.body.rotation);
        this.cannons.fireCannons(this.destructor.x, this.destructor.y, socket, target, 'destructor', angle);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
        this.depthCharges.fireDepthCharge(this.destructor.x, this.destructor.y, socket);
      } else {
        this.destructor.setAcceleration(0)
        this.destructor.setVelocityY(0)
        this.destructor.setVelocityX(0)
      }
      if ((this.destructor.coodOriginalX != this.destructor.x &&
        this.destructor.coodOriginalY != this.destructor.y &&
        this.destructor.rotationOriginal != this.destructor.rotation)) {
        socket.emit('playerMovement', {
          x: this.destructor.x,
          y: this.destructor.y,
          rotation: this.destructor.rotation,
          socketId: socket.id,
          life: this.life
        })
        this.coodOriginalX = this.destructor.x;
        this.coodOriginalY = this.destructor.y;
        this.rotationOriginal = this.destructor.rotation;
      }
    }
  }
}

export default Destructor;