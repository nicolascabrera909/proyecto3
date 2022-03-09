import Torpedos from "./torpedos.js";
import Cannons from "./cannons.js";

class Submarino extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.is_destroyed = false;
    this.setVisible(false);
    this.coodOriginalX = 0;
    this.coodOriginalY = 0;
    this.depthOriginal = 1;
    this.rotationOriginal = 0;
    this.depth = 1;
    this.torpedos = new Torpedos(scene);
    this.cannons = new Cannons(scene);
    this.life = 3;
  }

  create(coordenadas, self, cursor) {
    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino");
    this.submarino.setCollideWorldBounds(true);
    this.submarino.setDisplaySize(100, 20);
    this.submarino.setSize(140, 20);
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    this.submarino.flipX = true;
    this.depth = 1;
    if (cursor) {
      this.selfSubmarino = self;
      self.cameras.main.setBounds(0, 0, 3200, 1120);
      self.cameras.main.startFollow(this.submarino, true);
      self.cameras.main.roundPixels = true;
      self.cameras.main.setZoom(1.5);

      self.smallCamera = self.cameras.add(1000, 10, 500, 400);
      self.smallCamera.rotation = 0;
      self.smallCamera.zoom = 0.1;
      self.smallCamera.setBounds(0, 0, 200, 200);

      this.keySPACEBAR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.keyENTER = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
    this.submarino.setImmovable(true);
    return this.submarino;
  }

  get() {
    return this.submarino;
  }

  destroy(socket, self) {
    this.submarino.destroy();
    this.submarino.is_destroyed = true;
    self.anims.create(self.explosionConfig);
    self.add.sprite(this.submarino.x, this.submarino.y, 'explosion').play('explodeAnimation');
    console.log("en clase subamarino, luego del destroy");
    self.ship_collision_sound.play();
    if (socket) {
      socket.emit('destroy_submarino', {
        socketId: socket.id
      });
    }
  }

  surface(socket) {
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    this.selfSubmarino.cameras.main.setZoom(1.5);
    this.depth = 1;
    if (socket) {
      socket.emit('changeDepth', {
        depth: 1,
        socketId: socket.id
      });
    }
  }

  immerse(socket) {
    this.submarino.setAlpha(0.7, 0.7, 0, 0);
    this.selfSubmarino.cameras.main.setZoom(2);
    this.depth = 2;
    if (socket) {
      socket.emit('changeDepth', {
        depth: 2,
        socketId: socket.id
      });
    }
  }

  deepImmerse(socket) {
    this.submarino.setAlpha(0.4, 0.4, 0, 0);
    this.selfSubmarino.cameras.main.setZoom(3);
    this.depth = 3;
    if (socket) {
      socket.emit('changeDepth', {
        depth: 3,
        socketId: socket.id
      });
    }
  }

  surfaceOpponent(socket) {
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    this.depth = 1;
    if (socket) {
      socket.emit('changeDepth', {
        depth: 1,
        socketId: socket.id
      });
    }
  }

  immerseOpponent(socket) {
    this.submarino.setAlpha(0.7, 0.7, 0, 0);
    this.depth = 2;
    if (socket) {
      socket.emit('changeDepth', {
        depth: 2,
        socketId: socket.id
      });
    }
  }

  deepImmerseOpponent(socket) {
    this.submarino.setAlpha(0.4, 0.4, 0, 0);
    this.depth = 3;
    if (socket) {
      socket.emit('changeDepth', {
        depth: 3,
        socketId: socket.id
      });
    }
  }

  moveSubmarino(cursors, socket, input, self, target) {
    let nivel;
    //Movimientos sumarino)
    if (!this.submarino.is_destroyed) {
      if (cursors.left.isDown) {
        this.submarino.setAngularVelocity(-120)
      } else if (cursors.right.isDown) {
        this.submarino.setAngularVelocity(120)
      } else {
        this.submarino.setAngularVelocity(0)
      }
      const velX = Math.cos((this.submarino.angle - 360) * 0.01745)
      const velY = Math.sin((this.submarino.angle - 360) * 0.01745)
      if (cursors.down.isDown) {
        this.submarino.setVelocityX(200 * velX)
        this.submarino.setVelocityY(200 * velY)
      } else if (cursors.up.isDown) {
        this.submarino.setVelocityX(-400 * velX)
        this.submarino.setVelocityY(-400 * velY)
      } else if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
          if (this.depth === 2) {
            var angle = Phaser.Math.DegToRad(this.submarino.body.rotation);
            this.torpedos.fireTorpedos(this.submarino.x, this.submarino.y, socket, angle);
          } else {
            console.log('Torpedo disponible solo semisumergido.');
          }
      } else if (Phaser.Input.Keyboard.JustDown(this.keySPACEBAR)) {
        if (this.depth === 1) {
          this.cannons.fireCannons(this.submarino.x, this.submarino.y, socket, target, 'submarino');
        } else {
          console.log('Cannon disponible solo en superficie.');
        }
      } else if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
        this.surface(socket);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
        this.immerse(socket);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
        this.deepImmerse(socket);
      } else {
        this.submarino.setAcceleration(0)
        this.submarino.setVelocityY(0)
        this.submarino.setVelocityX(0)
      }
      var x = this.submarino.x;
      var y = this.submarino.y;
      var r = this.submarino.rotation;

      if ((this.coodOriginalX != this.submarino.x ||
        this.coodOriginalY != this.submarino.x ||
        this.rotationOriginal != this.submarino.rotation ||
        this.depthOriginal != this.depth)) {
        socket.emit('playerMovement', {
          x: this.submarino.x,
          y: this.submarino.y,
          rotation: this.submarino.rotation,
          depth: this.depth,
          socketId: socket.id,
          life: this.life,
        })
        this.coodOriginalX = x;
        this.coodOriginalY = y;
        this.rotationOriginal = r;
        this.depthOriginal = this.depth;
      }
    }
  }
}

export default Submarino;