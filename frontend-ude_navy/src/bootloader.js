// configuracion de las escenas
class Bootloader extends Phaser.Scene {
    constructor(){
        super('Bootloader');
    }

    loadScripts () {
        
    }
    
    loadMusic () {
        
        this.load.audio('audio_menu', [
            './static/assets/audio/Dangerous.mp3',
        ]);
    

    }
    loadImages () {
        this.load.image('logo', './static/assets/img/logo.jpeg');
        this.load.image('menu-bg', './static/assets/img/background_menu.png');
        this.load.image('blueButton1', './static/assets/img/blue_button02.png');
        this.load.image('blueButton2', './static/assets/img/blue_button03.png');
        this.load.image('checked', './static/assets/img/checkbox_checked.png');
        this.load.image('unchecked', './static/assets/img/checkbox_unchecked.png');

    }

    loadFonts () {
        this.load.json('fontJSON', './static/assets/font/font.json');
        this.load.image('font', './static/assets/font/font.png');
    }

    

    preload () {
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadMusic();

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