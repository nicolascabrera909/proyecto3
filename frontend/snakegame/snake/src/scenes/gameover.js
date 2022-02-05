class Gameover extends Phaser.Scene {
    constructor() {
        super('Gameover');
    }

    preload() {
        console.log('Soy Gameover');
    }

    create() {
        this.scene.stop('UI');
        // posiciona el texto en el centro
        this.add.dynamicBitmapText(this.sys.game.config.width/2, 
            this.sys.game.config.height/2 - 30, 
            'pixel', 'GAMEOVER', 20).setOrigin(0.5);
        
        // salida automatica si no se sale solo de la pantalla 
        this.evento = setTimeout(() => {
            this.salirEscene();
        }, 5000);
        
        // eventos para salir de la pantalla de de gameover
        this.input.keyboard.on('keydown_ENTER', () => {
            this.salirEscene();
        });
        // eventos para salir de la pantalla de de gameover
        this.input.on('pointerdown', () => {
            this.salirEscene();
        })
    }

    salirEscene() {
        clearTimeout(this.evento);
        this.scene.start('Menu');
    }

}

export default Gameover;