//IMPORTS
import Game from "./scenes/game.js";

import Gameover from "./scenes/gameover.js";

// CONFIG BASICA
const config = {
    title: 'UDE Navy',
    width: 1344,
    height: 704,
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
    scene: [Game, Gameover],
}

new Phaser.Game(config);