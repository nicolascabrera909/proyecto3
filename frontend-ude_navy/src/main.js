// importacion de las escenas
import Bootloader from "./bootloader.js";
import Menu from "./scenes/menu.js";
import Credits from "./scenes/credits.js";
import Game from "./scenes/game.js";
import Help from "./scenes/help.js";

/*
 
import Play from "./scenes/play.js";
import GameOver from "./scenes/gameover.js";
import UI from "./scenes/UI.js";

*/
// CONFIG BASICA
const config = {
    title: 'Snake',
    width: 600,
    height: 400,
    type: Phaser.AUTO, // ESTO ES PARA CANVAS O WEBGL
    parent: 'container', // hacemos ref al div donde se va a dibugar el juego
    //backgroundColor: '#f9ca24',
    pixelArt: true, // carga el liezo
    physics: {
        default: "arcade",
        //esto es para probar que funcionan las prop physics
        //arcade: {
        //    gravity: {y: 100}
        //}
    },
    title: '1.0',
    scene: [Bootloader, Menu, Credits, Game, Help],
}

new Phaser.Game(config); // forma de cargar phaser