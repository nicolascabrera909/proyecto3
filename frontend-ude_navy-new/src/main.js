//IMPORTS
import Game from "./scenes/game.js";

// CONFIG BASICA
const config = {
    title: 'UDE Navy',
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'game-screen',
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
          }
    },
    title: '1.0',
    scene: [Game],
}

new Phaser.Game(config);