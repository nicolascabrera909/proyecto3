class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    /**obtengo la version de la base*/
    getVersion(){
        var url = 'http://localhost:3000/version';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    /***/
    showVersion(){
        this.version = this.getVersion();
        this.add.text(this.sys.game.config.width - 80, this.sys.game.config.height - 20, 'Version:' + this.version, { font: '10px Courier', fill: '#ffffff' })
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
          this.add.zone(this.sys.game.config.width/2, this.sys.game.config.height/2 - offset * 30, this.sys.game.config.width, this.sys.game.config.height)
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
        this.loadBackground();
        this.showVersion();
        this.helpText();

        // Game
        this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, 1);
        this.gameText = this.add.text(0, 0, 'Jugar', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);
        this.gameButton.on('pointerdown', function (pointer) {
            this.scene.start('Game' );
        }.bind(this));

        
        // Help
        this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.optionsButton);
        this.optionsText = this.add.text(0, 0, 'Ayuda', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);
        this.optionsButton.on('pointerdown', function (pointer) {
            this.scene.start('Help');
        }.bind(this));
        

        // creditos
        this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.creditsButton, -1);
        this.creditsText = this.add.text(0, 0, 'Creditos', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.creditsText, this.creditsButton);
        this.creditsButton.on('pointerdown', function (pointer) {
            this.scene.start('Credits');
        }.bind(this));
       
        //Poner imagen en lugar de un check (usar la de Tomas pero hay que achicarla)
        this.soundOn = false;
        this.soundText = this.add.text(this.sys.game.config.width/2 , 300, 'Sonido', { fontSize: 14 });
        this.soundButton = this.add.sprite(this.sys.game.config.width/2 - 30, 310, 'unchecked');
        this.soundButton.setInteractive();

        this.soundButton.on('pointerdown', function () {
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