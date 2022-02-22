class Torpedo extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.scene = scene;
        this.pos_x = x;
        this.pos_y = y;
        this.quantity = 0;
    }

    get() {
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
    }

    // VER SI VALE LA PENA YA QUE ES UNA VARIABLE QUE HAY EN GAME, SI ES PROLIJO HACERLO ASI

    set_quantity() {
        this.scene.cant_torpedos_enviados += 1;
    }

    get_quantity() {
        return this.scene.cant_torpedos_enviados;
    }


}

export default Torpedo;