class Submarino {
    constructor(scene){
        this.scene = scene;
        
    }

    showSubmarino(){
        //this.add.image(this.sys.game.config.width -480, this.sys.game.config.height -220, 'submarino').setDisplaySize(50, 10);
      var randomX = Phaser.Math.Between(400, this.scene.game.config.width-50);
      var randomY = Phaser.Math.Between(50, this.scene.game.config.height-50);
      //this.add.image(randomX, randomY, 'submarino').setDisplaySize(50, 10).flipX=true;
      this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino")
      this.submarino.setDisplaySize(50, 10)
      this.submarino.flipX=true;
      //this.scene.physics.add.collider(this.cuerpo[0], this.cuerpo[i], () => this.choca());
    }
    
    moveSubmarino(){
  
        this.scene.input.keyboard.on('keydown-RIGHT', () => {
          this.submarino.x += 10;
        });
        this.scene.input.keyboard.on('keydown-LEFT', () => {
            this.submarino.x -= 10; 
        });
        this.scene.input.keyboard.on('keydown-UP', () => {
            this.submarino.y -= 10;
        });
        this.scene.input.keyboard.on('keydown-DOWN', () => {
            this.submarino.y += 10;
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