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
    this.carguero = this.scene.physics.add.sprite(x, y, 'carguero');
    this.carguero.setDisplaySize(80, 15);
    this.carguero.setSize(140, 20);
    this.carguero.setCollideWorldBounds(true);
    return this.carguero;
  }

  moveCarguero(socket){
    var velocidad = 5
    this.carguero.setVelocity(velocidad, 0);
    if( !(this.carguero.x== this.coodOriginalX && this.carguero.y==this.coodOriginalX && this.carguero.x)){
      if (this.carguero.x > 3160){
        this.carguero.setVelocity(0, 0);
      }
      socket.emit('playerMovementCarguero', { 
        x: this.carguero.x, 
        y: this.carguero.y 
      },
      this.idCarguero)
      this.coodOriginalX=this.carguero.x;
      this.coodOriginalY=this.carguero.y;
    }
  }
}

export default Carguero;