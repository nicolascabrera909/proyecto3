class Destructor extends Phaser.Physics.Arcade.Image {


  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.is_destroyed = false;
    this.setVisible(false);
  }

    create(coordenadas, self){
      var randomX = coordenadas.x;
      var randomY = coordenadas.y;
      this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
      this.destructor.setDisplaySize(180, 40);
      this.destructor.flipX = true;
      console.log("Termino crear destructor")
      this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.enter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      //this.destructor.setImmovable();
      //this.destructor.setCollideWorldBounds(true);
            //this.destructor.setBounce(1);

      self.cameras.main.setBounds(0, 0, 3200, 1600);
      self.cameras.main.startFollow(this.destructor, true);
      self.cameras.main.roundPixels = true;

      self.cameras.main.setZoom(1);
    }

    get(){
      return this.destructor;
    }

    
    destroy(){
      this.destructor.destroy();
      this.destructor.is_destroyed = true;
    }

    shootTorpedo() {
      this.torpedo = new Torpedo(this.scene, this.destructor.x, this.destructor.y, 'torpedo')
      this.torpedo.setVisible(false);
      this.torpedo.createShootTorpedo(this.destructor);
    }
  
    shootCannon(input) {
      this.canon = new Canion(this.scene, this.destructor.x, this.destructor.y, 'canon')
      this.canon.setVisible(false);
      this.canon.createShootCannon(this.destructor, this.input);
    }

    moveDestructor(input) {
      if (!this.submarino.is_destroyed) {
        console.log("intento de movimiento");
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        var keyA = this.scene.input.keyboard.addKey('A');
        this.key = this.scene.input.keyboard.addKeys({
          'A': Phaser.Input.Keyboard.KeyCodes.A
        });
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
          this.shootTorpedo();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.enter)) {
          this.shootCannon(input);
          //this.shootBullet(this.x, this.y);
        }
        if (this.submarino) {
          if (this.cursors.left.isDown) {
            this.submarino.setAngularVelocity(-12)
          } else if (this.cursors.right.isDown) {
            this.submarino.setAngularVelocity(12)
          } else {
            this.submarino.setAngularVelocity(0)
          }
          const velX = Math.cos((this.submarino.angle - 360) * 0.01745)
          const velY = Math.sin((this.submarino.angle - 360) * 0.01745)
          if (this.cursors.down.isDown) {
            this.submarino.setVelocityX(20 * velX)
            this.submarino.setVelocityY(20 * velY)
          } else if (this.cursors.up.isDown) {
            this.submarino.setVelocityX(-40 * velX)
            this.submarino.setVelocityY(-40 * velY)
          } else {
            this.submarino.setAcceleration(0)
            this.submarino.setVelocityY(0)
            this.submarino.setVelocityX(0)
          }
        }
  
      }
    }

/*
        //mover derecha
        this.scene.input.keyboard.on('keydown-RIGHT', () => {
          //console.log(Phaser.Input.Keyboard.KeyCodes);
          this.destructor.x += 1;
        });
        //mover izquierda
        this.scene.input.keyboard.on('keydown-LEFT', () => {
          //console.log(Phaser.Input.Keyboard.KeyCodes);
          this.destructor.x -= 1; 
        });
        //mover arriba
        this.scene.input.keyboard.on('keydown-UP', () => {
         // console.log(Phaser.Input.Keyboard.KeyCodes);
          this.destructor.y -= 1;
        });
        //mover abajo
        this.scene.input.keyboard.on('keydown-DOWN', () => {
         // console.log(Phaser.Input.Keyboard.KeyCodes);
          this.destructor.y += 1;
        });
        //giro izquierda
        this.scene.input.keyboard.on('keydown-A', () => {
         // console.log(Phaser.Input.Keyboard.KeyCodes);
          this.destructor.flipX = true;
        });
         //giro derecha
         this.scene.input.keyboard.on('keydown-S', () => {
          console.log(Phaser.Input.Keyboard.KeyCodes);
          this.destructor.flipX = false;
        });*/

    }
}

export default Destructor;

/*showDestructor(){
        // no se esta usando
        //this.add.image(this.sys.game.config.width -480, this.sys.game.config.height -250, 'destructor').setDisplaySize(37, 13).setOrigin(-5, -3);
        var randomX = Phaser.Math.Between(50, 300);
        var randomY = Phaser.Math.Between(50, this.scene.game.config.height-50);
        this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
        this.destructor.setBounce(1);
        this.destructor.setDisplaySize(180, 30);
        this.destructor.setCollideWorldBounds(true);

    }*/