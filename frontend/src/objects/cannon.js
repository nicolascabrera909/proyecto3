class Cannon extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'cannon');
    }

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

    disable(self) {
        let selfCannon = this;
        setTimeout(function (){
            selfCannon.destroy();
        }, 5000);
    }
}

export default Cannon;