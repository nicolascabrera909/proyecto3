class Carguero extends Phaser.GameObjects.Sprite {



  constructor(scene, x, y, type,id) {

    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    this.setVisible(false);
    this.coodOriginalX=0;
    this.coodOriginalY=0;
    this.idCarguero=id;
  }


  create(boat) {
    let self = this;
     return self.showCargueros(self, boat);
    
  }

  get_type(boat) {
    return boat.type;
  }

  showCargueros(self, boat) {
    const x = boat.positionX;
    const y = boat.positionY;
 
    //ubico al carguero
    this.carguero = this.scene.physics.add.sprite(x, y, 'carguero');
    this.carguero.setDisplaySize(100, 20)//.setOrigin();  
    //this.carguero.setCollideWorldBounds(true);
  
    return this.carguero;
  }
  //console.log(gameList[0].playerList[indice].boatList[i].instanceOf))

  moveCarguero(socket){
    var velocidad = 2
    this.carguero.setVelocity(velocidad, 0);
    if( !(this.carguero.x== this.coodOriginalX && this.carguero.y==this.coodOriginalX  )){
      socket.emit('playerMovementCarguero', { x: this.carguero.x, y: this.carguero.y },this.idCarguero)
      this.coodOriginalX=this.carguero.x;
      this.coodOriginalY=this.carguero.y;
    }
  }
}


export default Carguero;