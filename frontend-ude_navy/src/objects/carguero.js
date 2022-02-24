class Carguero extends Phaser.GameObjects.Sprite{
    
  
  
  constructor(scene,x,y,type){
    super(scene,x,y,type);    
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.setVisible(false);
    }
    

    create(gameList) {
      this.showCargueros(gameList);
    }


    showCargueros(gameList){
      var velocidad=2
      let indice = 0;
      
      if( gameList[0].playerList[0].boattype=='submarino'){
        indice = 1;
      }
      for (var i = 0; i < gameList[0].playerList[indice].boatList.length - 1; i++) {
        //console.log(gameList[0].playerList[indice].boatList[i].instanceOf))
        let x;
        let y;
        x = gameList[0].playerList[indice].boatList[i].x
        y = gameList[0].playerList[indice].boatList[i].y
        this.carguero=this.scene.physics.add.sprite(x, y, 'carguero');
        this.carguero.setDisplaySize(30, 10).setOrigin(x, y);  
        this.carguero.setCollideWorldBounds(true); 
        this.carguero.setVelocity(velocidad,0);
        
      }
    }
      
      
}

export default Carguero;