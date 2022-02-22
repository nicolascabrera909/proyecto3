import Torpedo from "./torpedo.js";
import Canion from "./canon.js";
import Bullets from "./bullets.js";


class Submarino extends Phaser.GameObjects.Sprite {


  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.is_destroyed = false;
  }
  


  create(coordenadas) {
    //var resultado=this.obtengoCoordendad();
    //console.log(resultado);
    //console.log(playerInfo);

    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino");
    this.submarino.setDisplaySize(30, 10);
    this.submarino.flipX = true;
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }

  get() {
    return this.submarino;
  }

  destroy() {
    this.submarino.destroy();
    this.submarino.is_destroyed = true;

  }

  shootTorpedo() {
    this.torpedo = new Torpedo(this.scene, this.submarino.x, this.submarino.y, 'torpedo')
    this.torpedo.setVisible(false);
    this.torpedo.create();
  }

  shootCannon() {
    this.canon = new Canion(this.scene, this.submarino.x, this.submarino.y, 'canon')
    this.canon.setVisible(false);
    this.canon.create();
  }

  shootBullet() {
    this.bullet = new Bullets();
    this.bullet.fireBullet(this.x, this.y);
  }

  moveSubmarino() {
    if (!this.submarino.is_destroyed) {
      console.log("intento de movimiento");
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      var keyA = this.scene.input.keyboard.addKey('A');
      this.key = this.scene.input.keyboard.addKeys({
        'A': Phaser.Input.Keyboard.KeyCodes.A
      });
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.shootTorpedo();
        //this.shootCannon();
      }
      else if (keyA.isDown) {
        this.shootCannon();
        //this.shootBullet(this.x, this.y);
      }
      if (this.submarino) {
        if (this.cursors.left.isDown) {
          this.submarino.setAngularVelocity(-100)
        } else if (this.cursors.right.isDown) {
          this.submarino.setAngularVelocity(100)
        } else {
          this.submarino.setAngularVelocity(0)
        }
        const velX = Math.cos((this.submarino.angle - 360) * 0.01745)
        const velY = Math.sin((this.submarino.angle - 360) * 0.01745)
        if (this.cursors.down.isDown) {
          this.submarino.setVelocityX(200 * velX)
          this.submarino.setVelocityY(200 * velY)
        } else if (this.cursors.up.isDown) {
          this.submarino.setVelocityX(-100 * velX)
          this.submarino.setVelocityY(-100 * velY)
        } else {
          this.submarino.setAcceleration(0)
          this.submarino.setVelocityY(0)
          this.submarino.setVelocityX(0)
        }
      }
    
    }
  }
}

export default Submarino;