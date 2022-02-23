class Carguero extends Phaser.GameObjects.Sprite{
    
  
  
  constructor(scene,x,y,type){
    super(scene,x,y,type);    
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.setVisible(false);
    }
    

    create(coordenadas) {
      this.showCargueros(coordenadas);
    }


    showCargueros(coordenadas){
        var velocidad=2
        var randomX = coordenadas.x;
        var randomY = coordenadas.y;
        let x=0;
        let y=0;
        let i=0;
        for (i; i < 3; i++) {
          //this.add.image(this.sys.game.config.width -270, this.sys.game.config.height -230, 'carguero').setDisplaySize(19, 7).setOrigin(-x, -y);  
          this.carguero=this.scene.physics.add.sprite(randomX, randomY, 'carguero');
         // this.carguero=this.scene.physics.add.image(randomX, randomY, 'carguero');
          this.carguero.setDisplaySize(30, 10).setOrigin(x, y);  
          this.carguero.setCollideWorldBounds(true); 
          this.carguero.setVelocity(velocidad,0);
          
          y=y+2;
        }
        x=x-2;
        y=y-2;
        for (i; i > 0; i--) {
           //this.add.image(this.sys.game.config.width -270, this.sys.game.config.height -200, 'carguero').setDisplaySize(19, 7).setOrigin(-x, -y);
          this.carguero=this.scene.physics.add.image(randomX, randomY, 'carguero').setDisplaySize(30, 10).setOrigin(x, y);
          this.carguero.setCollideWorldBounds(true); 
          this.carguero.setVelocity(velocidad,0);
          y=y-2;
        }
      }


      //mostrar dificultad dificil
      showCarguerosDificil(){
        
        var randomX;
        var randomY;
        var randomXAux=0;
        var randomYAux=0;
        
        for (i; i < 3; i++) {
          randomX=Phaser.Math.Between(0, 200);
          randomY = Phaser.Math.Between(50, this.scene.game.config.height-50);
          if(randomX==randomXAux){
            randomX =randomX +20;
          }
          if(randomY==randomYAux){
            randomY =randomY +20;
          }
          this.carguero=this.scene.physics.add.image(randomX, randomY, 'carguero').setDisplaySize(30, 10);
          this.carguero.setCollideWorldBounds(true); 
          y=y+2;
          randomXAux=randomX;
          randomYAux=randomX;
        }
      
        for (i; i > 0; i--) {
          randomX=Phaser.Math.Between(0, 300);
          randomY = Phaser.Math.Between(50, this.scene.game.config.height-50);
          if(randomX==randomXAux){
            randomX =randomX +20;
          }
          if(randomY==randomYAux){
            randomY =randomY +20;
          }
          this.carguero=this.scene.physics.add.image(randomX, randomY, 'carguero').setDisplaySize(30, 10);
          this.carguero.setCollideWorldBounds(true);
          randomXAux=randomX;
          randomYAux=randomX;
        }
      }

   
   /* moveCarguero(){
        //this.carguero.x++;
        //this.carguero.setVelocity(5,0);
    }*/
}

export default Carguero;