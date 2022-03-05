class DepthCharge extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'depth_charge', 1);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.name = "bomb";
        this.available = true;
        this.setVisible(true);
        this.depth;
    }

    fire(x, y, self, angle) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        //this.setAngle(Phaser.Math.RadToDeg(angle));
        //self.scene.physics.velocityFromRotation(angle, -1, this.body.velocity);
    }

    fireDepthCharge(x, y, socket, self, angle) {
        this.fire(x, y, this, angle);
        this.disable(self, socket);
        if (socket) {
            socket.emit('depthChargeThrowing', {
                x: x, y: y,
                socket_id: socket.id
            });
        }
    }

    fireDepthChargeOpponent(x, y, self, socket) {
        this.fire(x, y, this);
        this.disable(self, socket);
    }

    disable(self, socket) {
        let selfDepthCharge = this;
        setTimeout(function () {
            selfDepthCharge.setAlpha(0.7, 0.7, 0, 0);
            this.depth = 1;
        }, 3000);
        setTimeout(function () {
            selfDepthCharge.setAlpha(0.4, 0.4, 0, 0);
            this.depth = 2;
        }, 4000);
        setTimeout(function () {
            selfDepthCharge.available = false;
            selfDepthCharge.setVisible(false);
        }, 100000);
    }

    bombDestructor(self) {
        if (this.available) {
            self.anims.create(self.explosionConfig);
            self.add.sprite(this.x, this.y, 'explosion').play('explodeAnimation');
            this.available = false;
            this.setVisible(false);
        }
    }
}

export default DepthCharge;