class Bullet extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire (x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.setAngle(Phaser.Math.RadToDeg(z));
        self.scene.physics.velocityFromRotation(z - (Math.PI/2), 600, this.body.velocity);
        this.disable(this);
    }

    disable(self) {
        setTimeout(function (){
            self.setActive(false);
            self.setVisible(false);
        }, 300);

    }

}

export default Bullet;