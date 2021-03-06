class DepthCharge extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'depth_charge');
    }

    //Dispara la depthCharge
    fire (x, y, self) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setAngle(Phaser.Math.RadToDeg(1));
        self.scene.physics.velocityFromRotation(0, 1, this.body.velocity);
        self.scene.depth_charge_sound.play();
        this.disable();
    }


    disable() {
        let selfDepthCharge = this;            
        setTimeout(function () {
            selfDepthCharge.destroy();
        }, 15000);
    }
}

export default DepthCharge;