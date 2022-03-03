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

    fireDepthChargeOpponent(x, y, self) {
        this.fire(x, y, this);
        this.disable(self);
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
        }, 80000);
        setTimeout(function () {
            if (socket) {
                socket.emit('destroy_depthCharge', { socketId: socket.id });
            }
            selfDepthCharge.destroy();
        }, 120000);
    }


    bombDestructor(self) {
        if (this.available) {
            //self.anims.create(self.explosionConfig);
            //self.add.sprite(this.x, this.y, 'explosion').play('explodeAnimation');
            this.available = false;
            this.setVisible(false);
        }
    }

    /*
    destroy(socket) {
        if(this.available){
            this.available = false;
            this.setVisible(false);
            this.destroy();
            if (socket) {
            socket.emit('destroy_depthCharge', { socketId: socket.id });
            }
        }
    }*/


    /*bombEmitDamage(self, sender, id){
        if(this.available){
            if(sender){
                self.socket.emit('bombThrowing', {
                    socket_id : self.socket.id
                });
            }
        }
    }*/


    /* METODOS VIEJOS

    get() {
        return this.depth_charge;
    }

    createShootDepthCharge(ship) {
        this.depth_charge = this.scene.physics.add.sprite(this.pos_x, this.pos_y, 'depth_charge');
        //this.depth_charge.setCollideWorldBounds(true);
        //this.depth_charge.setVelocity(-10, -10);
        this.depth_charge.setVisible(false);
        this.depth_charge.scale = 10;
        this.lifespan = 1000;
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(ship.x, ship.y);
        this.body.reset(ship.x, ship.y);
        this.set_quantity();
    }

    countDown(){

    }

    set_quantity() {
        this.scene.cant_depthcharge += 1;
    }

    get_quantity() {
        return this.scene.cant_depthcharge;
    }*/
}

export default DepthCharge;