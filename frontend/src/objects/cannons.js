import Cannon from "./cannon.js"
class Cannons extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 15,
            key: 'bulletCannon',
            active: false,
            visible: true,
            classType: Cannon
        });
        this.available = true;
        this.last = [];
        this.armyAvailable = true;
    }

    fireCannons(x, y, socket, target, shipType, angle) {
        let bullet = this.getFirstDead(false);
        if (this.armyAvailable === true) {
            if (bullet) {
                bullet.fire(x, y, this, target, shipType, angle);
                this.armyAvailable = false;
                this.resetArmy();
            }
            if (socket) {
                socket.emit('shootingCannon', {
                    x: x, y: y,
                    socket_id: socket.id,
                    target: target,
                    shipType: shipType,
                    angle: angle
                });
            }
            this.last.push(bullet);
        }
    }

    disable() {
        let self = this;
        setTimeout(function () {
            self.available = false;
        }, 300);
    }

    destroy(socket, self) {
        let bullet = this.last.pop();
        bullet.destroy();
        if (socket) {
            socket.emit('destroy_cannons', {
                socketId: socket.id
            });
        }
    }

    resetArmy() {
        setTimeout(() => {
            this.armyAvailable = true;
        }, 2000);
    }
}

export default Cannons;