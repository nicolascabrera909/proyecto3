class Bullets extends Phaser.Physics.Arcade.Group{

    constructor (scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 100,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
         });
        this.available = true;
    }

    fireBullet (x, y, sender, socket) {
        let bullet = this.getFirstDead(false);
        if (bullet) {
            this.disable(this);
            bullet.fire(x, y, z, this);
        }
        if(sender){
            socket.emit('shooting', {
                x: x, y: y,
                socket_id : socket.id,
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

export default Bullets;