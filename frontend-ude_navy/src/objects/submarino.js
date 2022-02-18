import Torpedo from "./torpedo.js";
import Canion from "./canon.js";
import Bullets from "./bullets.js";


class Submarino extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.is_destroyed = false
  }

  create(playerInfo) {
    console.log(playerInfo);
    /*
    var randomX = Phaser.Math.Between(400, this.scene.game.config.width - 50);
    var randomY = Phaser.Math.Between(50, this.scene.game.config.height - 50);
    this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino")
    this.submarino.setDisplaySize(50, 10);
    this.submarino.flipX = true;
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    */

    var randomX = Phaser.Math.Between(400, this.scene.game.config.width - 50);
    var randomY = Phaser.Math.Between(50, this.scene.game.config.height - 50);
    var url = 'http://localhost:3000/coordenadas/';
    var param = "submarino" 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url + param, false);
    xmlHttp.send(null);
    
    var coordenadas = JSON.parse(xmlHttp.responseText);
    console.log("param" + coordenadas.param);
    this.submarino = this.scene.physics.add.image(parseInt(coordenadas.x), parseInt(coordenadas.y), "submarino")
    this.submarino.setDisplaySize(50, 10);
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