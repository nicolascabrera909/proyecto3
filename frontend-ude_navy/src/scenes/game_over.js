class GameOver extends Phaser.Scene {
    constructor() {
        super();
    }

    

    create(){
        var content = [
        "Tiempo exedido. Fin de la partida" 
        ];

        this.add.text(40, 100, content, { fontSize: '20px', fill: '#fff' });

    }
    
}

export default GameOver;
