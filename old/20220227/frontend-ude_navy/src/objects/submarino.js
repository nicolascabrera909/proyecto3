import Torpedo from "./torpedo.js";
import Canion from "./canon.js";

class Submarino extends Phaser.Physics.Arcade.Image {

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
    this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino");
    this.submarino.setDisplaySize(180, 30);
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    this.submarino.flipX = true;
    if (cursor){
      this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.enter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.a = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.s = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.d = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      //this.submarino.setColliderBound(0, 0, 3200, 1600);
      this.selfSubmarino = self;
      self.cameras.main.setBounds(0, 0, 3200, 1600);
      self.cameras.main.startFollow(this.submarino, true);
      self.cameras.main.roundPixels = true;
      self.cameras.main.setZoom(1.5);
    }
    
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
    this.torpedo.createShootTorpedo(this.submarino);
  }

  shootCannon(input) {
    this.canon = new Canion(this.scene, this.submarino.x, this.submarino.y, 'canon')
    this.canon.setVisible(false);
    this.canon.createShootCannon(this.submarino, this.input);
  }

  immerse(input, self) {
    this.submarino.setAlpha(0.7, 0.7, 0, 0);
    self.cameras.main.setZoom(2);
    return 2;
  }
  deepImmerse(input, self) {
    this.submarino.setAlpha(0.4, 0.4, 0, 0);
    self.cameras.main.setZoom(3);
    return 3
  }
  surface(input, self) {
    this.submarino.setAlpha(0.9, 0.9, 0.9, 0.9);
    self.cameras.main.setZoom(1.5);
    return 1;
  }

  deepLevel(self, nivel) {
    var indice = 0;
    if (!self.gameList[0].playerList[0].boatTeam == 'submarino') {
      indice = 1;
    }
    self.gameList[0].playerList[indice].boatList[0].depth = nivel;
  }

  moveSubmarino(input, socket) {
    let nivel;

    
    if (!this.is_destroyed) {
      
      //acciones del submarino
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.shootTorpedo();
      }
      else if (Phaser.Input.Keyboard.JustDown(this.enter)) {
        this.shootCannon(input);
      }
      else if (Phaser.Input.Keyboard.JustDown(this.s)) {
        nivel = this.immerse(input, this.selfSubmarino);
        this.deepLevel(socket.games, nivel);
        console.log('    -Profundidad submarino'+socket.games.gameList[0].playerList[0].boatList[0].depth);
      }
      else if (Phaser.Input.Keyboard.JustDown(this.a)) {
        nivel = this.deepImmerse(input, this.selfSubmarino);
        this.deepLevel(socket.games, nivel);
        console.log('    -Profundidad submarino'+socket.games.gameList[0].playerList[0].boatList[0].depth);
      }
      else if (Phaser.Input.Keyboard.JustDown(this.d)) {
        nivel = this.surface(input, this.selfSubmarino);
        this.deepLevel(socket.games, nivel);
        console.log('    -Profundidad submarino'+socket.games.gameList[0].playerList[0].boatList[0].depth);
      }


      //Movimientos sumarino
      if (this.submarino) {
        if (this.cursors.left.isDown) {
          this.submarino.setAngularVelocity(-120)
          // socket.emit('movimientoSubmarino');
        } else if (this.cursors.right.isDown) {
          this.submarino.setAngularVelocity(120)
        } else {
          this.submarino.setAngularVelocity(0)
        }


        const velX = Math.cos((this.submarino.angle - 360) * 0.01745)
        const velY = Math.sin((this.submarino.angle - 360) * 0.01745)
        if (this.cursors.down.isDown) {
          this.submarino.setVelocityX(200 * velX)
          this.submarino.setVelocityY(200 * velY)
        } else if (this.cursors.up.isDown) {
          this.submarino.setVelocityX(-400 * velX)
          this.submarino.setVelocityY(-400 * velY)
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