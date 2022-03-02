import DepthCharge from "./depth_charge.js";
import Canion from "./canon.js";

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
  }

  create(coordenadas, self, cursor) {
    var randomX = coordenadas.x;
    var randomY = coordenadas.y;
    this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
    // this.destructor.setDisplaySize(180, 30);
    // this.destructor.setSize(1400, 200);
    this.destructor.flipX = false;
    //this.destructor.setRotation(playerInfo.rotation)
    if (cursor) {
      console.log("Termino crear destructor");
      self.cameras.main.setBounds(0, 0, 3200, 1600);
      self.cameras.main.startFollow(this.destructor, true);
      self.cameras.main.roundPixels = true;
      self.cameras.main.setZoom(1);
      this.keySPACEBAR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.keyENTER = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      
    }
    //this.destructor.setCollideWorldBounds(true);
    this.destructor.setImmovable(true);

    return this.destructor;

  }

  get() {
    return this.destructor;
  }

  destroy(socket) {
    this.destructor.destroy();
    this.destructor.is_destroyed = true;
    if (socket) {
      socket.emit('destroy_destructor', { socketId: socket.id });
    }
  }

  shootDepthCharge(socket) {
    this.depth_charge = new DepthCharge(this.scene, this.destructor.x, this.destructor.y, 'depth_charge')
    this.depth_charge.setVisible(false);
    this.depth_charge.createShootDepthCharge(this.destructor);
    if(socket){
      socket.emit('shootingDepthCharge', {socketId: socket.id});
    }
  }

  shootCannon(input, socket) {
    this.canon = new Canion(this.scene, this.destructor.x, this.destructor.y, 'canon')
    this.canon.setVisible(false);
    this.canon.createShootCannon(this.destructor, input, socket);
    this.scene.cannon_sound.play();
    if(socket){
      socket.emit('shootingCannonDestructor', {socketId: socket.id});
    }
  }

  moveDestructor(cursors, socket, input, self) {
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
        this.shootCannon(input, socket);
      } else if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
        this.depthCharge.fireDepthCharge(this.destructor.x, this.destructor.y, socket, self);
        
        //this.shootDepthCharge(socket);
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
        this.destructor.coodOriginalX =  this.destructor.x ;
        this.destructor.coodOriginalY =  this.destructor.y ;
        this.destructor.rotationOriginal = this.destructor.rotation;
      }
    }
  }
}

export default Destructor;