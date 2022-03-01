//IMPORTS
import Game from "./scenes/game.js";
import GameOver from "./scenes/game_over.js";

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
    scene: [Game, GameOver],
}

new Phaser.Game(config);