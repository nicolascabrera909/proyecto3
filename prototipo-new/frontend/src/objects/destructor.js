import DepthCharge from "./depth_charge.js";
import Canion from "./canon.js";

class Destructor extends Phaser.Physics.Arcade.Image {

  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.is_destroyed = false;
    this.setVisible(false);
  }

  create(coordenadas, self, cursor) {
    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
    this.destructor.setDisplaySize(180, 30);
    this.destructor.flipX = false;
    if(cursor){
      this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.enter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      //this.destructor.setCollideWorldBounds(true);
      console.log("Termino crear destructor");
      self.cameras.main.setBounds(0, 0, 3200, 1600);
      self.cameras.main.startFollow(this.destructor, true);
      self.cameras.main.roundPixels = true;
      self.cameras.main.setZoom(1);
    }
    
  }

  

  get() {
    return this.destructor;
  }


  destroy() {
    this.destructor.destroy();
    this.destructor.is_destroyed = true;
  }

  shootDepthCharge() {
    this.depth_charge = new DepthCharge(this.scene, this.destructor.x, this.destructor.y, 'depth_charge')
    this.depth_charge.setVisible(false);
    this.depth_charge.createShootDepthCharge(this.destructor);
  }

  shootCannon(input) {
    this.canon = new Canion(this.scene, this.destructor.x, this.destructor.y, 'canon')
    this.canon.setVisible(false);
    this.canon.createShootCannon(this.destructor, this.input);
  }

  moveDestructor(input) {
    if (this.destructor) {
      //console.log("intento de movimiento destructor");
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.shootDepthCharge();
      }
      else if (Phaser.Input.Keyboard.JustDown(this.enter)) {
        this.shootCannon(input);
      }
      if (this.destructor) {
        if (this.cursors.left.isDown) {
          this.destructor.setAngularVelocity(-120)
         // socket.emit('movimientoDestructor');

        } else if (this.cursors.right.isDown) {
          this.destructor.setAngularVelocity(120)
        } else {
          this.destructor.setAngularVelocity(0)
        }
        const velX = Math.cos((this.destructor.angle - 360) * 0.01745)
        const velY = Math.sin((this.destructor.angle - 360) * 0.01745)
        if (this.cursors.down.isDown) {
          this.destructor.setVelocityX(-100 * velX)
          this.destructor.setVelocityY(-100 * velY)
        } else if (this.cursors.up.isDown) {
          this.destructor.setVelocityX(200 * velX)
          this.destructor.setVelocityY(200 * velY)
        } else {
          this.destructor.setAcceleration(0)
          this.destructor.setVelocityY(0)
          this.destructor.setVelocityX(0)
        }
      }
    }
  }
}

export default Destructor;

// moveDestructor() {

  //   this.cursors = this.scene.input.keyboard.createCursorKeys();
  //   if (this.destructor) {
  //     if (this.cursors.left.isDown) {
  //       this.destructor.setAngularVelocity(-100)
  //     } else if (this.cursors.right.isDown) {
  //       this.destructor.setAngularVelocity(100)
  //     } else {
  //       this.destructor.setAngularVelocity(0)
  //     }
  //     const velX = Math.cos((this.destructor.angle - 360) * 0.01745)
  //     const velY = Math.sin((this.destructor.angle - 360) * 0.01745)
  //     if (this.cursors.down.isDown) {
  //       this.destructor.setVelocityX(-200 * velX)
  //       this.destructor.setVelocityY(-200 * velY)
  //     } else if (this.cursors.up.isDown) {
  //       this.destructor.setVelocityX(100 * velX)
  //       this.destructor.setVelocityY(100 * velY)
  //     } else {
  //       this.destructor.setAcceleration(0)
  //       this.destructor.setVelocityY(0)
  //       this.destructor.setVelocityX(0)
  //     }
  //   }