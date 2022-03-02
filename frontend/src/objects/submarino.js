import Torpedos from "./torpedos.js";
import Canion from "./canon.js";

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
    this.depth=1;
    this.torpedos = new Torpedos(scene);
  }

  create(coordenadas, self, cursor) {
    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino");
    // this.submarino.setDisplaySize(180, 30);
    // this.submarino.setSize(1100, 200);
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    this.submarino.flipX = true;
    //this.submarino.setRotation(playerInfo.rotation)
    if (cursor) {
      this.selfSubmarino = self;
      self.cameras.main.setBounds(0, 0, 3200, 1600);
      self.cameras.main.startFollow(this.submarino, true);
      self.cameras.main.roundPixels = true;
      self.cameras.main.setZoom(1.5);
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

  destroy(socket) {
    this.submarino.destroy();
    this.submarino.is_destroyed = true;
    if (socket) {
      socket.emit('destroy_submarino', { socketId: socket.id });
    }
  }

  shootTorpedo(socket) {
    this.torpedo = new Torpedo(this.scene, this.submarino.x, this.submarino.y, 'torpedo')
    this.torpedo.setVisible(false);
    this.torpedo.createShootTorpedo(this.submarino);
    console.log('shootTorpedo submarino', this.submarino.x, this.submarino.y)
    this.scene.torpedo_sound.play();
    if (socket) {
      socket.emit('shooting', { socketId: socket.id });
    }
  }

  shootCannon(input, socket) {
    this.canon = new Canion(this.scene, this.submarino.x, this.submarino.y, 'canon')
    this.canon.setVisible(false);
    this.canon.createShootCannon(this.submarino, input, socket);
    this.scene.cannon_sound.play();
    if (socket) {
      socket.emit('shootingCannon', { socketId: socket.id });
    }
  }

  surface(input, socket) {
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    this.selfSubmarino.cameras.main.setZoom(1.5);
    if (socket) {
      socket.emit('surface', { socketId: socket.id });
    }
    this.submarino.depth=1;
   // return 1;
  }

  immerse(input, socket) {
    this.submarino.setAlpha(0.7, 0.7, 0, 0);
    this.selfSubmarino.cameras.main.setZoom(2);
    if (socket) {
      socket.emit('immerse', { socketId: socket.id });
    }
    this.submarino.depth=2;
   // return 2;
  }

  deepImmerse(input, socket) {
    this.submarino.setAlpha(0.4, 0.4, 0, 0);
    this.selfSubmarino.cameras.main.setZoom(3);
    if (socket) {
      socket.emit('deepImmerse', { socketId: socket.id });
    }
    this.submarino.depth=3;
    //return 3
  }

  /*surfaceOpponent(input, socket) {
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    if (socket) {
      socket.emit('surface', { socketId: socket.id });
    }
    return 1;
  }

  immerseOpponent(input, socket) {
    this.submarino.setAlpha(0.7, 0.7, 0, 0);
    if (socket) {
      socket.emit('immerse', { socketId: socket.id });
    }
    return 2;
  }

  deepImmerseOpponent(input, socket) {
    this.submarino.setAlpha(0.4, 0.4, 0, 0);
    if (socket) {
      socket.emit('deepImmerse', { socketId: socket.id });
    }
    return 3
  }*/

 

  moveSubmarino(cursors, socket, input, self) {
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
      } else if (Phaser.Input.Keyboard.JustDown(this.keySPACEBAR)) {
        //this.shootTorpedo(socket);
        console.log("entro al spacebar de torpedo");
        this.torpedos.fireTorpedos(this.submarino.x, this.submarino.y, self);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
        this.shootCannon(input, socket);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
        //nivel = this.deepImmerse(input, this.selfSubmarino);
        //this.deepLevel(socket.games, nivel, socket);
        this.surface(input, socket);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
        //nivel = this.immerse(input, this.selfSubmarino);
        //this.deepLevel(socket.games, nivel, socket);
        this.immerse(input, socket);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
        //nivel = this.surface(input, this.selfSubmarino);
        //this.deepLevel(socket.games, nivel, socket);
        this.deepImmerse(input, socket);
      } else {
        this.submarino.setAcceleration(0)
        this.submarino.setVelocityY(0)
        this.submarino.setVelocityX(0)
      }
      var x = this.submarino.x
      var y = this.submarino.y
      var r = this.submarino.rotation

      /*socket.emit('playerMovement', {
        x: this.submarino.x,
        y: this.submarino.y,
        rotation: this.submarino.rotation
      });*/
    

      if (!(this.submarino.coodOriginalX == this.submarino.x &&
        this.submarino.coodOriginalY == this.submarino.x &&
        this.submarino.rotationOriginal == this.submarino.rotation &&
        this.submarino.depthOriginal==this.submarino.depth ) )
        {
        socket.emit('playerMovement', { x: this.submarino.x, y: this.submarino.y, rotation: this.submarino.rotation ,depth: this.submarino.depth})
        this.submarino.coodOriginalX = x;
        this.submarino.coodOriginalY = y;
        this.submarino.rotationOriginal = r;
        this.submarino.depthOriginal=this.submarino.depth;
        
        
      }



    }
  }

  /*
  shootSubmarino(input, socket){
    if (Phaser.Input.Keyboard.JustDown(this.keySPACEBAR)) {
      this.shootTorpedo();
    } else if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
      this.shootCannon(input);
    }
    socket.emit('shooting', {
      x: this.submarino.x, y: this.submarino.y,
      socketId : socket.id,
  }
  }*/

}

export default Submarino;