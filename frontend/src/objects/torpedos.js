import Torpedo from "./torpedo.js"

class Torpedos extends Phaser.Physics.Arcade.Group {

    constructor (scene) {
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

    fireTorpedos (x, y, socket, angle) {
        let bullet = this.getFirstDead(false);
        if (bullet) {
            this.disable(this);
            bullet.fire(x, y, this, angle);
        }/*
        if(socket){
            socket.emit('shooting', {
                x: x, y: y,
                socket_id : socket.id
            });
        }*/
    }

    disable(){
        let self = this;
        setTimeout(function (){
            self.available = false;
        }, 300);
    }


    // METODOS VIEJOS
    /*get() {
        return this.torpedo;
    }

    createShootTorpedo(ship) {
        this.torpedo = this.scene.physics.add.image(this.pos_x, this.pos_y, 'torpedo');
        //this.torpedo.setCollideWorldBounds(true);
        //this.torpedo.setVelocity(-10, -10);
        this.torpedo.setVisible(false);

        this.torpedo.scale = 10;

        this.lifespan = 1000;

        this.setActive(true);
        this.setVisible(true);
        this.setAngle(ship.body.rotation);
        this.setPosition(ship.x, ship.y);
        this.body.reset(ship.x, ship.y);
        var angle = Phaser.Math.DegToRad(ship.body.rotation);
        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
        this.body.velocity.x *= -5;
        this.body.velocity.y *= -5;
        this.set_quantity();
    }

    // VER SI VALE LA PENA YA QUE ES UNA VARIABLE QUE HAY EN GAME, SI ES PROLIJO HACERLO ASI

    set_quantity() {
        this.scene.cant_torpedos_enviados += 1;
    }

    get_quantity() {
        return this.scene.cant_torpedos_enviados;
    }*/
}

export default Torpedos;