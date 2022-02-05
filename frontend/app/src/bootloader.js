// configuracion de las escenas
class Bootloader extends Phaser.Scene {
    constructor(){
        super('Bootloader');
    }

    preload(){
        // aca se cargaran los assets
        console.log('soy preload');

        // para cargar imagenes en la memoria de phaser
        this.load.image('cuerpo', './app/assets/body.png');
        this.load.image('comida', './app/assets/food.png');
        this.load.image('tablero', './app/assets/tablero.png');
        
        this.load.json('fontJSON', './app/assets/font/font.json');
        this.load.image('font', './app/assets/font/font.png');

        this.load.on('complete', () => {
            const fontJSON = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

            this.scene.start('Menu');
        });


    }

}

// luego de crear las escenas hay que enlazarlas con phaser
export default Bootloader;