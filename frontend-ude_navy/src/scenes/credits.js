class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
        console.log('Credits');
    }

    create () {
        this.creditsText = this.add.text(0, 0, 'Juego creado por', { fontSize: '20px', fill: '#fff' });

        this.madeByText = this.add.text(0, 0, 'Nico, Tomas, Seba, Fede y Rodrigo para la UDE-Montevideo', { fontSize: '10px', fill: '#fff' });


        this.zone = this.add.zone(this.sys.game.config.width/2, this.sys.game.config.height/2, this.sys.game.config.width, this.sys.game.config.height);
    
        Phaser.Display.Align.In.Center(
          this.creditsText,
          this.zone
        );
    
        Phaser.Display.Align.In.Center(
          this.madeByText,
          this.zone
        );

      
    
        this.madeByText.setY(1000);
    
        this.creditsTween = this.tweens.add({
          targets: this.creditsText,
          y: -100,
          ease: 'Power1',
          duration: 6000,
          delay: 1000,
          onComplete: function () {
            this.destroy;
          }
        });
    
        this.madeByTween = this.tweens.add({
          targets: this.madeByText,
          y: 0,
          ease: 'Power2',
          duration: 10000,
          delay: 100,
          onComplete: function () {
            this.madeByTween.destroy;
            this.scene.start('Menu');
          }.bind(this)
        });

      
      }
}

export default Credits;