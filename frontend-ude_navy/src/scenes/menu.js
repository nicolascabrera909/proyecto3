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

    loadLogo(){
        // se centra la imagen como logo para cuando inicia el juego
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2 , 'logo').setScale(0.5);
    }

    helpText(){
        /*
        const pressButton = this.add.dynamicBitmapText(
            this.sys.game.config.width/2, 
            this.sys.game.config.height - 40
            , 'pixel', 'PRESIONE UN BOTON PARA COMENZAR',
             12).setOrigin(0.5);
        
        
        // EFECTO DE PARPADEO EN EL TEXTO
        this.tweens.add({
            targets: pressButton,
            alpha: 0, // -> trasparencia
            ease: (x) => x < 0.5 ? 0 : 1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        */


    }

    centerButton (gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
          gameObject,
          this.add.zone(this.sys.game.config.width/2, this.sys.game.config.height/2 - offset * 50, this.sys.game.config.width, this.sys.game.config.height)
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
    preload(){
        
    }

    create() {
        this.playMusic()
        this.showVersion();
        this.loadLogo();
        this.helpText();

        // Game
        this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
        this.centerButton(this.gameButton, 1);
        this.gameText = this.add.text(0, 0, 'Jugar', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);
        this.gameButton.on('pointerdown', function (pointer) {
        this.scene.start('Game' );
        }.bind(this));
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('blueButton2');
        });
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('blueButton1');
        });
        

        // Options
        this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.optionsButton);
        this.optionsText = this.add.text(0, 0, 'Opciones', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.optionsText, this.optionsButton);
        this.optionsButton.on('pointerdown', function (pointer) {
            this.scene.start('Configuration');
        }.bind(this));
        // Credits
        this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
        this.centerButton(this.creditsButton, -1);
        this.creditsText = this.add.text(0, 0, 'Creditos', { fontSize: '15px', fill: '#fff' });
        this.centerButtonText(this.creditsText, this.creditsButton);
        this.creditsButton.on('pointerdown', function (pointer) {
            this.scene.start('Credits');
        }.bind(this));
        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton2');
        });
        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setTexture('blueButton1');
        });
        

        


        // eventos para entrar al juego desde el menu
        // si presiono arriba, abajo, izq o der llamo a la escena "PLAY"
        /*
        this.input.keyboard.on('keydown_RIGHT', () => {
            this.scene.start('Play');
        });
        this.input.keyboard.on('keydown_LEFT', () => {
            this.scene.start('Play');
        });
        this.input.keyboard.on('keydown_UP', () => {
            this.scene.start('Play');
        });
        this.input.keyboard.on('keydown_DOWN', () => {
            this.scene.start('Play');
        });

        this.input.keyboard.on('keydown_ENTER', () => {
            this.scene.start('Play');
        });
        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        })
        */

    }

}

export default Menu;