// configuracion de las escenas
class Bootloader extends Phaser.Scene {
    constructor(){
        super('Bootloader');
    }


    preload(){
        // aca se cargaran los assets
        console.log('soy preload');

        // para cargar imagenes en la memoria de phaser
        this.load.image('cuerpo', './assets/body.png');
        this.load.image('comida', './assets/food.png');
        this.load.image('tablero', './assets/tablero.png');
        
        this.load.json('fontJSON', './assets/font/font.json');
        this.load.image('font', './assets/font/font.png');

        
        this.load.on('complete', () => {
            const fontJSON = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

            this.scene.start('Menu');
        });


    }




    // cada escena tiene metodos propios de phaser
    /*
    init(){
        // se llama inmediantamente despues que se inicializa el contructor
        console.log('soy init');
    }
    
    preload(){
        // aca se cargaran los assets
        console.log('soy preload');
    }
    update(){
        // este seria el bucle el juego
        console.log('soy update');
    }
    */
}

// luego de crear las escenas hay que enlazarlas con phaser
export default Bootloader;