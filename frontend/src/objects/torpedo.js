class Torpedo extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'torpedo');
    }

    fire (x, y, self, angle) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setAngle(Phaser.Math.RadToDeg(angle));
        self.scene.physics.velocityFromRotation(angle, -300, this.body.velocity);
        this.disable(self);
    }

    disable(self) {
        let selfTorpedo = this;
        setTimeout(function (){
            selfTorpedo.destroy();
        }, 5000);
    }

    destroy(socket, self) {
        this.torpedo.destroy();
        // self.anims.create(self.explosionConfig);
        // self.add.sprite(this.submarino.x, this.submarino.y, 'explosion').play('explodeAnimation');
        if (socket) {
            socket.emit('destroy_torpedo', {
                socketId: socket.id
            });
        }
    }
}

export default Torpedo;