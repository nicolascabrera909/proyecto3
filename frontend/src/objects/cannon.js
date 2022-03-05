class Cannon extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'cannon');
    }

    fire (x, y, self, target) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        /*this.angle = Phaser.Math.Angle.BetweenPoints(this.ship, target);
       
        self.scene.physics.velocityFromRotation(this.angle, 300, this.body.velocity);
        this.disable(self);*/

        self.scene.physics.moveToObject(this, target, 200);
    }

    disable(self) {
        let selfCannon = this;
        setTimeout(function (){
            selfCannon.destroy();
        }, 5000);
    }
}

export default Cannon;