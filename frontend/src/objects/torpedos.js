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
    }

    fireTorpedos(x, y, socket, angle) {
        let bullet = this.getFirstDead(false);
        if (bullet) {
            this.disable(this);
            bullet.fire(x, y, this, angle);
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
        this.torpedos.destroy();
        // self.anims.create(self.explosionConfig);
        // self.add.sprite(this.submarino.x, this.submarino.y, 'explosion').play('explodeAnimation');
        if (socket) {
            socket.emit('destroy_torpedo', {
                socketId: socket.id
            });
        }
    }
}

export default Torpedos;