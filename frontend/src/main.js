//IMPORTS
import Game from "./scenes/game.js";
import Room from "./scenes/room.js";

// CONFIG BASICA
const config = {
    title: 'UDE Navy',
    width: 1360,
    height: 720,
    type: Phaser.AUTO,
    parent: 'game-screen',
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
          }
    },
    title: '1.0',
    scene: [Room,Game],
}

new Phaser.Game(config);