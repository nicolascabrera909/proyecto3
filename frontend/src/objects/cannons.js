import Cannon from "./cannon.js"

class Cannons extends Phaser.Physics.Arcade.Group {

    constructor (scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 50,
            key: 'bulletCannon',
            active: false,
            visible: true,
            classType: Cannon
         });
        this.available = true;
    }

    fireCannons (x, y, socket, target, shipType) {
        let bullet = this.getFirstDead(false);
        if (bullet) {
            this.disable(this);
            bullet.fire(x, y, this, target);
        }
        if(socket){
            socket.emit('shootingCannon', {
                x: x, y: y,
                socket_id : socket.id,
                target: target,
                shipType: shipType
            });
        }
    }

    disable(){
        let self = this;
        setTimeout(function (){
            self.available = false;
        }, 300);
    }
}

export default Cannons;