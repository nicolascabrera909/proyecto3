// configuracion de las escenas
class Bootloader extends Phaser.Scene {
    constructor(){
        super('Bootloader');
    }

    loadScripts () {
        this.load.scripts('align_custom', './src/util/align.js')
        this.load.scripts('align_grid', './src/util/alignGrid.js')
        this.load.scripts('UI', './src/util/UIBlock.js')
    }
    
    loadMusic () {
        
        this.load.audio('audio_menu', [
            './static/assets/audio/Dangerous.mp3',
        ]);
    
    }
    loadImages () { 
        this.load.image('logo', './static/assets/img/logo.jpeg');
        this.load.image('background', './static/assets/img/background.png');
        this.load.image('blueButton1', './static/assets/img/blue_button02.png');
        this.load.image('blueButton2', './static/assets/img/blue_button03.png');
        this.load.image('checked', './static/assets/img/checkbox_checked.png');
        this.load.image('unchecked', './static/assets/img/checkbox_unchecked.png');
        this.load.image('mapa_principal', './static/assets/img/mapa.png');
        this.load.image('mapa_principal_dos', './static/assets/img/mapa.jpg');
    }

    loadFonts () {
        this.load.json('fontJSON', './static/assets/font/font.json');
        this.load.image('font', './static/assets/font/font.png');
    }

    progressBar(){
        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Cargando...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('cargando archivos: ' + file.key);
        });

        // remove progress bar when complete, cuando se cargo todo
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            //this.ready();
            const fontJSON = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

            this.scene.start('Menu');
        }.bind(this));

    }

    preload () {
        this.progressBar()
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        //this.loadMusic();
        
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