//imoprto archivos
import Map from "../objects/map.js";

class Room extends Phaser.Scene {

    constructor() {
        super('Room');
        console.log("Room");
        this.games = null;
        this.queryString = window.location.search;
        this.urlParams = new URLSearchParams(this.queryString);
        this.games = null;
    }


    loadImages() {
        this.load.tilemapTiledJSON('map', './static/assets/map/map.json');
    }

    preload() {
       // this.loadAudio();
       // this.loadAudioVariables();

    }


    create() {
        var self = this
        this.socket = io("http://localhost:3000")

        console.log('Obtengo datos pre-game.html');
        var username = this.urlParams.get('username');
        var boatType = this.urlParams.get('boattype');
        var difficulty = this.urlParams.get('dificultad');
        this.username = username;


        console.log('Emito createGame');
        this.socket.emit('createGame', username, boatType, difficulty);


        this.socket.on('salaEspera', () => {
            console.log('voy a a cambiar scena a game ')
            this.scene.start('Game');
        });


        //this.start_game.play();
        this.map = new Map(this, 'map', 'tiles', 'terrain');


        
    }





    update() {

    }


    /*loadAudio() {
        this.load.audio('cannon_sound', './static/assets/audio/cannon_sound.mp3')
          .audio('torpedo_sound', ['./static/assets/audio/torpedo_sound.mp3'])
          .audio('start_game', ['./static/assets/audio/start_game.mp3'])
          .audio('sea_water', ['./static/assets/audio/sea_water.mp3'])
      }

    loadAudioVariables() {
        // aca poner la musca que se use de fondo
        this.sea_water = this.sound.add('sea_water');
        this.sea_water.loop = true;
        this.start_game = this.sound.add('start_game');
        this.cannon_sound = this.sound.add('cannon_sound');
        this.torpedo_sound = this.sound.add('torpedo_sound');
        this.ship_collision_sound;
        this.depth_charge_sound;
        this.bg_sound;
    }*/


}

export default Room;