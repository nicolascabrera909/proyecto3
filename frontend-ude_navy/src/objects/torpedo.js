class Torpedo extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y,type){
      super(scene,x,y,type);    
      scene.add.existing(this);
      scene.physics.world.enable(this);
      this.scene = scene;
      this.pos_x = x;
      this.pos_y = y;
    }

    createShoot(){
        this.aa = this.scene.physics.add.image(this.pos_x, this.pos_y,'torpedo');
        this.aa.setVelocity(-100,0);
    }

    create(x,y){
        this.createShoot();
    }

  
}

export default Torpedo;