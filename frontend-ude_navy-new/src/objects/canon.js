class Canion extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y,type){
      super(scene,x,y,type);    
      scene.add.existing(this);
      scene.physics.world.enable(this);
      this.scene = scene;
      this.pos_x = x;
      this.pos_y = y;
      this.quantity = 0;
    }

    get() {
        return this.canon;
      }

    createShoot(){
        this.canon = this.scene.physics.add.image(this.pos_x, this.pos_y,'canon');
        //this.torpedo.setCollideWorldBounds(true);
        this.canon.setVelocity(100,0);
    }

    create(x,y){
        this.createShoot();
        this.set_quantity();
    }

    
    // VER SI VALE LA PENA YA QUE ES UNA VARIABLE QUE HAY EN GAME, SI ES PROLIJO HACERLO ASI

    set_quantity(){
        this.scene.cant_canones_enviados  += 1;
    }

    get_quantity(){
        return this.scene.cant_canones_enviados;
    }

  
}

export default Canion;