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
        this.last = [];

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
        this.last.push(bullet);

    }

    disable(){
        let self = this;
        setTimeout(function (){
            self.available = false;
        }, 300);
    }

    destroy(socket, self) {
        let bullet = this.last.pop();
        console.log(this.last);
        bullet.destroy();
        // self.anims.create(self.explosionConfig);
        // self.add.sprite(this.submarino.x, this.submarino.y, 'explosion').play('explodeAnimation');
        if (socket) {
            socket.emit('destroy_cannons', {
                socketId: socket.id
            });
        }
    }
}

export default Cannons;