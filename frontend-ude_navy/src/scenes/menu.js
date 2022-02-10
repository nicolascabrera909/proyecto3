class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    getMensaje(){
        var url = 'http://localhost:3000';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    

    showVersion(){
        this.mensaje = this.getMensaje();
        this.add.text(this.sys.game.config.width - 80, this.sys.game.config.height - 20, 'Versión: ' + this.sys.game.config.gameTitle, { font: '10px Courier', fill: '#2FA4E7' })
        this.add.text(this.sys.game.config.width - 180, this.sys.game.config.height - 20, this.mensaje, { font: '10px Courier', fill: '#2FA4E7' })
    }

    loadBackground(){
        // se centra la imagen como logo para cuando inicia el juego
        //this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2 , 'background').setScale(0.5);
        this.add.image(0, 0, 'background').setOrigin(0, 0)
    }

    helpText(){
        
    }

    centerButton (gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
          gameObject,
          this.add.zone(this.sys.game.config.width/2, this.sys.game.config.height/2 - offset * 20, this.sys.game.config.width, this.sys.game.config.height)
        );
      }
    centerButtonText (gameText, gameButton) {
        Phaser.Display.Align.In.Center(
            gameText,
            gameButton
        );
    }

    playMusic(){        
        var music = this.sound.add('audio_menu');
        music.play();
    }

    stopMusic(){
        var music = this.sound.add('audio_menu');
        music.stop();
    }
    preload(){
        //var music = this.sound.add('audio_menu');
        this.load.audio('audio_menu', [
            './static/assets/audio/Dangerous.mp3',
        ]);
    }
    

    create() {
        //this.playMusic()
        this.showVersion();
        this.loadBackground();
        this.helpText();

        // Game
        this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, 1);
        this.gameText = this.add.text(0, 0, 'Jugar', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);
        this.gameButton.on('pointerdown', function (pointer) {
            this.scene.start('Game' );
        }.bind(this));
        
      
        /*
        // Options
        this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.optionsButton);
        this.optionsText = this.add.text(0, 0, 'Opciones', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);
        this.optionsButton.on('pointerdown', function (pointer) {
            this.scene.start('Configuration');
        }.bind(this));

        */
        // creditos
        this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.creditsButton, -1);
        this.creditsText = this.add.text(0, 0, 'Creditos', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.creditsText, this.creditsButton);
        this.creditsButton.on('pointerdown', function (pointer) {
            this.scene.start('Credits');
        }.bind(this));
       
        //esto hay que cambiarlo para que sean en el onclick y no al pasar el mose por arriba.
        //Poner imagen en lugar de un check (usar la de Tomas pero hay que achicarla)

        this.soundOn = false;
        this.soundText = this.add.text(this.sys.game.config.width/2 , 400, 'Sonido', { fontSize: 24 });

        this.soundButton = this.add.sprite(this.sys.game.config.width/2 - 30, 410, 'unchecked');
    
        this.soundButton.setInteractive();
    
        
    
        this.soundButton.on('pointerout', function () {
            this.soundOn = !this.soundOn;
            this.updateAudio();
        }.bind(this));
       
    }

    updateAudio() {
        
    
        if (this.soundOn === false) {
          this.soundButton.setTexture('unchecked');
          this.sound.stopByKey('audio_menu');
          console.log('seapaga');
          
        } else {
          this.soundButton.setTexture('checked');
          console.log('se prende');
          this.playMusic(); //-> ver como prender la musica aca
        }
      }

}

export default Menu;