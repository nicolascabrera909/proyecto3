class Cannon extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'cannon');
    }

    fire (x, y, self, target) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        self.scene.physics.moveToObject(this, target, 200);
        self.scene.cannon_sound.play();
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