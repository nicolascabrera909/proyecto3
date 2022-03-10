class Cannon extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'cannon');
    }

    //Dispara el cannon en el angulo recibido por parametro
    fire (x, y, self, target, shipType, angle) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setAngle(Phaser.Math.RadToDeg(angle));
        self.scene.cannon_sound.play();
        var time;
        if (shipType === 'destructor'){
            self.scene.physics.velocityFromRotation(angle, 300, this.body.velocity);
            time = 2500;
        } else {
            self.scene.physics.velocityFromRotation(angle, -300, this.body.velocity);
            time = 1250;
        }
        this.disable();
    }

    //Destruye al cannon al superar el tiempo definido si no hubo una colision 
    disable(self) {
        let selfCannon = this;
        setTimeout(function (){
            selfCannon.destroy();
        }, 1500);
    }
}

export default Cannon;