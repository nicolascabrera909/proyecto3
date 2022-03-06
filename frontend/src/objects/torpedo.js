class Torpedo extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'torpedo');
    }

    fire (x, y, self, angle) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setAngle(Phaser.Math.RadToDeg(angle));
        self.scene.physics.velocityFromRotation(angle, -300, this.body.velocity);
        this.disable(self);
    }

    disable(self) {
        let selfTorpedo = this;
        setTimeout(function (){
            selfTorpedo.destroy();
        }, 10000);
    }
}

export default Torpedo;