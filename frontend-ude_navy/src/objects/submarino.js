class Submarino extends Phaser.GameObjects.Sprite {
  //anterior
  /*constructor(scene){
       this.scene = scene;
    }*/
  constructor(scene,x,y,type){
    super(scene,x,y,type);    
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    }


    showSubmarino(){
      
      var randomX = Phaser.Math.Between(400, this.scene.game.config.width-50);
      var randomY = Phaser.Math.Between(50, this.scene.game.config.height-50);
      //this.submarino = this.scene.physics.add.image(randomX, randomY, "submarino")
      this.submarino = this.scene.physics.add.sprite(randomX, randomY, "submarino")
      this.submarino.setDisplaySize(50, 10)
     // this.submarino.setOrigen(0,0);
      this.submarino.flipX=true;
      this.submarino.setCollideWorldBounds(true);
      //this.scene.physics.add.collider(this.cuerpo[0], this.cuerpo[i], () => this.choca());
      //this.cursorKeys=this.scene.input.keyboard.createCursorKeys();
      this.spacebar=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    
    shootTorpedo(){
      var torpedo=this.scene.physics.add.image(this.submarino.x,this.submarino.y,'torpedo');
      torpedo.setVelocity(-100,0);
    }

    moveSubmarino(){
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
        this.shootTorpedo();
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
      //////////////
        // /*mover derecha*/
        // this.scene.input.keyboard.on('keydown-RIGHT', () => {
        //   //console.log(Phaser.Input.Keyboard.KeyCodes);
        //   this.submarino.x += 10;
        // });
        // /*mover izquierda*/
        // this.scene.input.keyboard.on('keydown-LEFT', () => {
        //   //console.log(Phaser.Input.Keyboard.KeyCodes);
        //   this.submarino.x -= 10; 
        // });
        // /*mover arriba*/
        // this.scene.input.keyboard.on('keydown-UP', () => {
        //  // console.log(Phaser.Input.Keyboard.KeyCodes);
        //   this.submarino.y -= 10;
        // });
        // /*mover abajo*/
        // this.scene.input.keyboard.on('keydown-DOWN', () => {
        //  // console.log(Phaser.Input.Keyboard.KeyCodes);
        //   this.submarino.y += 10;
        // });
        // /*giro izquierda*/
        // this.scene.input.keyboard.on('keydown-A', () => {
        //  // console.log(Phaser.Input.Keyboard.KeyCodes);
        //   this.submarino.flipX = true;
        // });
        //  /*giro derecha*/
        //  this.scene.input.keyboard.on('keydown-S', () => {
        //   console.log(Phaser.Input.Keyboard.KeyCodes);
        //   this.submarino.flipX = false;
        // });
    //////////////
  
     
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