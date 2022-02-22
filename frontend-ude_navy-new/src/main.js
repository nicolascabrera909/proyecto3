//IMPORTS
import Bootloader from "./bootloader.js";
// import Menu from "./src/scenes/menu.js";
// import Credits from "./src/scenes/credits.js";
import Game from "./scenes/game.js";
// import Help from "./src/scenes/help.js";
// import Choose from "./scenes/choose.js";

// CONFIG BASICA
const config = {
    title: 'UDE Navy',
    width: 800,
    height: 600,
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
    scene: [Bootloader, Game],
}

new Phaser.Game(config);