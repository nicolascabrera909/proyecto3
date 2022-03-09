import DepthCharge from "./depth_charge.js"

class DepthCharges extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 50,
            key: 'bulletDepthCharge',
            active: false,
            visible: true,
            classType: DepthCharge
        });
        this.available = true;
        this.last = [];
        this.depth = 1;
        this.armyAvailable = true;
    }

    fireDepthCharge(x, y, socket) {
        let bullet = this.getFirstDead(false);
        if (this.armyAvailable === true) {
            if (bullet) {
                this.disable(this);
                bullet.fire(x, y, this);
                this.armyAvailable = false;
                this.resetArmy();
            }
            if (socket) {
                socket.emit('depthChargeThrowing', {
                    x: x, y: y,
                    socket_id: socket.id,
                });
            }
            this.last.push(bullet);
        }
    }

    //Mientras pasa el tiempo la carga de profunidad cambia su profundidad
    disable() {
        let selfDepthCharge = this;
        setTimeout(function () {
            selfDepthCharge.setAlpha(0.7, 0.7, 0, 0);
        }, 1200);
        setTimeout(function () {
            selfDepthCharge.setAlpha(0.4, 0.4, 0, 0);
            selfDepthCharge.depth = 2;
        }, 6000);
    }

    destroy(socket, self) {
        let bullet = this.last.pop();
        bullet.destroy();
        if (socket) {
            socket.emit('destroy_depthCharge', {
                socketId: socket.id,
            });
        }
    }

    resetArmy() {
        setTimeout(() => {
            this.armyAvailable = true;
        }, 10000);
    }
}

export default DepthCharges;