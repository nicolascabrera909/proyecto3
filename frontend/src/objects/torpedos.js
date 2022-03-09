import Torpedo from "./torpedo.js"

class Torpedos extends Phaser.Physics.Arcade.Group {

    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 20,
            key: 'bullet',
            active: false,
            visible: true,
            classType: Torpedo
        });
        this.available = true;
        this.last = [];
        this.armyAvailable = true;
    }

    fireTorpedos(x, y, socket, angle) {
        let bullet = this.getFirstDead(false);
        if (this.armyAvailable === true){
            if (bullet) {
                bullet.fire(x, y, this, angle);
                this.armyAvailable = false;
                this.resetArmy();
            }
            if (socket) {
                socket.emit('shootingTorpedo', {
                    x: x, y: y,
                    socket_id: socket.id,
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
            self.setVisible(false);
        }, 2000);
    }

    destroy(socket, self) {
        let bullet = this.last.pop();
        bullet.destroy();
        if (socket) {
            socket.emit('destroy_torpedo', {
                socketId: socket.id,
            });
        }
    }

    resetArmy() {
        setTimeout(() => {
            this.armyAvailable = true;
        }, 2000);
    }
}

export default Torpedos;