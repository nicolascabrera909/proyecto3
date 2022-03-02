class DepthCharge extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y) {
        super(scene, x, y, 'depth_charge', 1);
        /*scene.add.existing(this);
        scene.physics.world.enable(this);
        this.scene = scene;
        this.pos_x = x;
        this.pos_y = y;
        this.quantity = 0;*/

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.name = "bomb";
        this.available = true;
        this.setVisible(true);
        //this.setDepth(3);
        //this.setScale(0.35);
    }

    fire(x, y, self) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        //this.setAngle(Phaser.Math.RadToDeg(z));
        //self.scene.physics.velocityFromRotation(z - (Math.PI/2), 20, this.body.velocity);
    }

    fireDepthCharge (x, y, socket, self) {
            this.fire(x, y, this);
            this.disable(self);
        if(socket){
            socket.emit('depthChargeThrowing', {
                x: x, y: y,
                socket_id : socket.id
            });
        }
    }

    fireDepthChargeOpponent(x, y, self) {
        console.log('entro al deep del oponente');
        this.fire(x, y, this);
        this.disable(self);
    }

    disable(self) {
        let selfDepthCharge = this;
        setTimeout(function () {
            selfDepthCharge.setAlpha(0.7, 0.7, 0, 0);
        }, 3000);
    }

    
    bombDestructor(self){
        if(this.available){
            //self.anims.create(self.explosionConfig);
            //self.add.sprite(this.x, this.y, 'explosion').play('explodeAnimation');
            this.available = false;
            this.setVisible(false);
        }
    }

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