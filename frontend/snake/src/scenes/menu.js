class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        console.log('Soy Menu');
    }

    create() {
        // se centra la imagen como logo para cuando inicia el juego
        this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2 - 50, 'comida').setScale(6);
        this.add.dynamicBitmapText(this.sys.game.config.width/2, this.sys.game.config.height/2
            , 'pixel', 'SNAKE', 18).setOrigin(0.5);
        
        
        const pressButton = this.add.dynamicBitmapText(this.sys.game.config.width/2, this.sys.game.config.height - 40
            , 'pixel', 'PRESS ANY BUTTON', 8).setOrigin(0.5);
        
        
        // EFECTO DE PARPADEO EN EL TEXTO
        this.tweens.add({
            targets: pressButton,
            alpha: 0, // -> trasparencia
            ease: (x) => x < 0.5 ? 0 : 1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });


        // eventos para entrar al juego desde el menu
        // si presiono arriba, abajo, izq o der llamo a la escena "PLAY"

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

    }

}

export default Menu;