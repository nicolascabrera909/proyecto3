class Carguero extends Phaser.GameObjects.Sprite{
    
  
  
  constructor(scene,x,y,type){
    
    super(scene,x,y,type);    
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.setVisible(false);
    }
    

    create(gameList) {
      let self = this;
      self.showCargueros(self, gameList);
    }

    get_type(boat){
      return boat.type;
    }

    showCargueros(self, gameList){
      var velocidad=2
      let indice = 0;
      
      if(gameList[0].playerList[0].boatTeam=='submarino'){
        indice = 1;
      }
      for (var i = 0; i < gameList[0].playerList[indice].boatList.length; i++) {
        if(self.get_type(gameList[0].playerList[indice].boatList[i]) == 'carguero'){
          this.carguero=this.scene.physics.add.sprite(gameList[0].playerList[indice].boatList[i].positionX, gameList[0].playerList[indice].boatList[i].positionY, 'carguero');
          this.carguero.setDisplaySize(100, 20)//.setOrigin(gameList[0].playerList[indice].boatList[i].positionX, gameList[0].playerList[indice].boatList[i].positionY);  
          //this.carguero.setCollideWorldBounds(true); 
          this.carguero.setVelocity(velocidad,0);

        }
        //console.log(gameList[0].playerList[indice].boatList[i].instanceOf))
        
        
      }
    }
      
      
}

export default Carguero;