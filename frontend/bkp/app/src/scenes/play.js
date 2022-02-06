import Snake from "../gameobjects/Snake.js";
import Comida from "../gameobjects/Comida.js";
//import io from "socket.io-client";

// configuracion de las escenas
class Play extends Phaser.Scene {
    constructor(){
        super('Play');
    }


    preload(){
        // aca se cargaran los assets
        console.log('scena play');
        //llamamos las imagens, la primera pos es la x (de izquierda a derecha) luego la y (de arriba hacia abajo)
        this.snake = new Snake(this); // this en este caso es Phaser.Scene 
        this.comida = new Comida(this);
        
    }

    create(){

        // con el launch ejecuta una escena al mismo tiempo que la escena base
        // algo asi nos servira para ir mostrando los puntos, barcos rotos, etc. (util para mostra puntuaciones en los juegos)
        this.scene.launch('UI');
        // esto es necesario para poder tener las propiedades de la clase UI desde aca
        // ej: sceneUI.addPoint(); que se usa mas abajo para sumar puntos cuando la serpiente come
        const sceneUI = this.scene.get('UI');

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.snake.changeMov('derecha');
        });
        this.input.keyboard.on('keydown-LEFT', () => {
            this.snake.changeMov('izquierda');
        });
        this.input.keyboard.on('keydown-UP', () => {
            this.snake.changeMov('arriba');
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.snake.changeMov('abajo');
        });

        // this.socket = io('http://localhost:3000');
        // this.socket.on('connect', function () {
        // 	console.log('Connected!');
        // });
        
        // Colision de cabeza con comida
        // this.snake.cuerpo[0] -> es la cebza
        this.physics.add.collider(this.snake.cuerpo[0], this.comida.comida, () => {
            this.comida.crearComida();
            this.snake.crece();
            sceneUI.addPoint();
        });

    }

    update(time) {
        //console.log(time);
        this.snake.update(time);
    }

   
}

// luego de crear las escenas hay que enlazarlas con phaser
export default Play;