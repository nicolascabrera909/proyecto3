class Destructor {
    constructor(scene){
        this.scene = scene;
        
    }

    showDestructor(){
        //this.add.image(this.sys.game.config.width -480, this.sys.game.config.height -250, 'destructor').setDisplaySize(37, 13).setOrigin(-5, -3);
        var randomX = Phaser.Math.Between(50, 300);
        var randomY = Phaser.Math.Between(50, this.scene.game.config.height-50);
        this.destructor = this.scene.physics.add.image(randomX, randomY, 'destructor');
        this.destructor.setDisplaySize(50, 10);
        this.destructor.setCollideWorldBounds(true);

    }

    moveDestructor(){

      this.cursors = this.scene.input.keyboard.createCursorKeys();
      if (this.destructor) {
        if (this.cursors.left.isDown) {
          this.destructor.setAngularVelocity(-100)
        } else if (this.cursors.right.isDown) {
          this.destructor.setAngularVelocity(100)
        } else {
          this.destructor.setAngularVelocity(0)
        }
        const velX = Math.cos((this.destructor.angle - 360) * 0.01745)
        const velY = Math.sin((this.destructor.angle - 360) * 0.01745)
        if (this.cursors.down.isDown) {
          this.destructor.setVelocityX(200 * velX)
          this.destructor.setVelocityY(200 * velY)
        } else if (this.cursors.up.isDown) {
          this.destructor.setVelocityX(-100 * velX)
          this.destructor.setVelocityY(-100 * velY)
        } else {
          this.destructor.setAcceleration(0)
          this.destructor.setVelocityY(0)
          this.destructor.setVelocityX(0)
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