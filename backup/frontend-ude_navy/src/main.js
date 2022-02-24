//IMPORTS
import Bootloader from "./bootloader.js";
import Menu from "./scenes/menu.js";
import Credits from "./scenes/credits.js";
import Game from "./scenes/game.js";
import Help from "./scenes/help.js";
import Choose from "./scenes/choose.js";

// CONFIG BASICA
const config = {
    title: 'UDE Navy',
    width: 3200,
    height: 1600,
    type: Phaser.AUTO,
    parent: 'container',
    //backgroundColor: '#f9ca24',
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
          }
    },
    title: '1.0',
    scene: [Bootloader, Menu, Credits, Game, Help, Choose],
}

new Phaser.Game(config);