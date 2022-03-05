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

    fire(x, y, self) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    fireDepthCharge(x, y, socket, self) {
        this.fire(x, y, this);
        this.disable(self, socket);
        if (socket) {
            socket.emit('depthChargeThrowing', {
                x: x, y: y,
                socket_id: socket.id
            });
        }
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

    destroy(socket, self) {
        this.depth_charge.destroy();
        // self.anims.create(self.explosionConfig);
        // self.add.sprite(this.submarino.x, this.submarino.y, 'explosion').play('explodeAnimation');
        if (socket) {
            socket.emit('destroy_depthCharge', {
                socketId: socket.id
            });
        }
    }
}

export default DepthCharge;