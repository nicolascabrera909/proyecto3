class Submarino {
    constructor(scene){
        this.scene = scene;
        
    }

    showSubmarino(){
      var randomX = Phaser.Math.Between(400, this.scene.game.config.width-50);
      var randomY = Phaser.Math.Between(50, this.scene.game.config.height-50);
      this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino")
      this.submarino.setDisplaySize(50, 10)
     // this.submarino.setOrigen(0,0);
      //this.submarino.flipX=true;
      //this.scene.physics.add.collider(this.cuerpo[0], this.cuerpo[i], () => this.choca());
      this.submarino.setCollideWorldBounds(true);
    }
    
    moveSubmarino(){
  
        /*mover derecha*/
        this.scene.input.keyboard.on('keydown-RIGHT', () => {
          //console.log(Phaser.Input.Keyboard.KeyCodes);
          this.submarino.x += 1;
        });
        /*mover izquierda*/
        this.scene.input.keyboard.on('keydown-LEFT', () => {
          //console.log(Phaser.Input.Keyboard.KeyCodes);
          this.submarino.x -= 1; 
        });
        /*mover arriba*/
        this.scene.input.keyboard.on('keydown-UP', () => {
         // console.log(Phaser.Input.Keyboard.KeyCodes);
          this.submarino.y -= 1;
        });
        /*mover abajo*/
        this.scene.input.keyboard.on('keydown-DOWN', () => {
         // console.log(Phaser.Input.Keyboard.KeyCodes);
          this.submarino.y += 1;
        });
        /*giro izquierda*/
        this.scene.input.keyboard.on('keydown-A', () => {
         // console.log(Phaser.Input.Keyboard.KeyCodes);
          this.submarino.flipX = true;
        });
         /*giro derecha*/
         this.scene.input.keyboard.on('keydown-S', () => {
          console.log(Phaser.Input.Keyboard.KeyCodes);
          this.submarino.flipX = false;
        });
        
  
     
      //this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      //this.left =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      /*
      this.submarino.setScale(0.5);
      this.submarino.flipX = false;
      this.submarino.setOrigin(0.5);  
      // Fisicas
      this.submarino.setCollideWorldBounds(true);
      this.submarino.setBounce(0.3);
      this.submarino.setAcceleration(50, 0);
      */
  
      
      //this.submarino.body.allowGravity = false;
      //this.submarino = this.physics.add.sprite(randomX, randomY, 'submarino').setDisplaySize(50, 10).flipX=true;
      
      //this.submarino.setCollideWorldBounds(true);
      //this.ball.setBounce(1)
      //this.cursors = this.input.keyboard.createCursorKeys()
    }

}

export default Submarino;