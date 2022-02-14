import Bullet from "./bullet.js";

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        console.log('entro a fireBullet');
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y);
        }
    }

    shootBullets (ship){
        console.log('shootBullets entre');
        this.scene.input.on('pointermove', (pointer) => {
            ship.x = pointer.x;
        });

        this.scene.input.on('pointerdown', (pointer) => {
            this.fireBullet(ship.x, ship.y);
        });
    }
}

export default Bullets;