class LateralCamera extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.scene = scene;
    var lateralCamera;
  }

  create(x, y, self) {
    var lateralCamera = this.scene.physics.add.image(x, y, 'choque');
    lateralCamera.input.once('pointerdown', function (){
      lateralCamera.destroy();
      lateralCamera=null
      //lateralCamera.removeFromDisplayList();
    });

    // self.cameras.main.startFollow(this.lateralCamera, true);
    /* setTimeout(function () {
      console.log("espero");
    }, 3000);
    console.log("camalara lateral");
    this.lateralCamera.setVisible(false);*/

    return this.lateralCamera;
  }
}
export default LateralCamera;