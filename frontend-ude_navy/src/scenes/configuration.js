class Configuration extends Phaser.Scene {
    constructor() {
        super('Configuration');
        console.log('Configuration');
    }

    /*
    Configuration ()
    {
        Phaser.Scene.call(this, { key: 'configuration' });
    }

    init (data)
    {
        console.log('init', data);

        this.music = data.musica;

    }

      */
    

    create () {
        this.soundOn = false;
        const loadingText = this.add.text(this.sys.game.config.width/2, 
            this.sys.game.config.height - (this.sys.game.config.height - 50) , 
            'Opciones', { fontSize: 30 }).setOrigin(0.5);


        this.soundButton = this.add.image(60, 100, 'unchecked');
        this.soundText = this.add.text(90, 90, 'Sonido habilitado', { fontSize: 24 });
    
        this.soundButton.setInteractive();
    
        
    
        this.soundButton.on('pointerdown', function () {
          this.soundOn = !this.soundOn;
          this.updateAudio();
        }.bind(this));
    
        
        this.menuButton = this.add.sprite(200, 150, 'blueButton1').setInteractive();
        this.menuText = this.add.text(0, 0, 'Ir al menú', { fontSize: '10px', fill: '#fff' });
        Phaser.Display.Align.In.Center(this.menuText, this.menuButton);
    
        this.menuButton.on('pointerdown', function (pointer) {
          this.scene.start('Menu');
        }.bind(this));
    
        this.updateAudio();
      }
    
      updateAudio() {
        
    
        if (this.soundOn === false) {
          this.soundButton.setTexture('unchecked');
          this.sound.stopByKey('audio_menu');
          console.log('seapaga');
          
        } else {
          this.soundButton.setTexture('checked');
          console.log('se prende');
          //this.music.play(); //-> ver como prender la musica aca
        }
      }
}

export default Configuration;