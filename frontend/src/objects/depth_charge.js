class DepthCharge extends Phaser.GameObjects.Sprite {

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
    }
}

export default DepthCharge;