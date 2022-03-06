import Torpedo from "./torpedo.js"

class Torpedos extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 100,
            key: 'bullet',
            active: false,
            visible: true,
            classType: Torpedo
        });
        this.available = true;
        this.lastBullet;
    }

    fireTorpedos(x, y, socket, angle) {
        this.lastBullet = this.getFirstDead(false);
        if (this.lastBullet) {
            this.disable(this);
            this.lastBullet.fire(x, y, this, angle);
        }
        if (socket) {
            socket.emit('shootingTorpedo', {
                x: x, y: y,
                socket_id: socket.id,
                angle: angle
            });
        }
    }

    disable() {
        let self = this;
        setTimeout(function () {
            self.available = false;
        }, 300);
    }

    destroy(socket, self) {
        this.lastBullet.destroy();
        // self.anims.create(self.explosionConfig);
        // self.add.sprite(this.submarino.x, this.submarino.y, 'explosion').play('explodeAnimation');
        if (socket) {
            socket.emit('destroy_torpedo', {
                socketId: socket.id,
                torpedo: this.lastBullet
            });
        }
    }
}

export default Torpedos;