class Torpedo extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'torpedo');
    }

    //Dispara el torpedo en el angulo recibido por parametro
    fire (x, y, self, angle) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setAngle(Phaser.Math.RadToDeg(angle));
        self.scene.physics.velocityFromRotation(angle, -300, this.body.velocity);
        self.scene.torpedo_sound.play();
        this.disable();
    }

    //Destruye al cannon al superar el tiempo definido si no hubo una colision 
    disable() {
        let selfTorpedo = this;
        setTimeout(function (){
            selfTorpedo.destroy();
        }, 2000);
    }
}

export default Torpedo;