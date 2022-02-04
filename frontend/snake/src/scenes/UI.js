class UI extends Phaser.Scene {
    constructor() {
        super('UI');
    }

    preload() {
        console.log('Soy UI');
    }
    
    create() {
        this.add.image(0, 0, 'tablero').setOrigin(0);
        // esto es para agregar texto, pixel es el nombre de la fuente, PUNTOS es el texto a mostar y 8 es el tamaño
        this.add.dynamicBitmapText(10, 7, 'pixel', 'PUNTOS', 8);
        // esto es para agregar los puntos al final de la zona donde va el texto
        // Phaser.Utils.String.Pad(0, 6, 0, 1) -> es para rellenar espaciones
        // 0 -> texto a poner, 6 -> cantidad de espacios a rellenar, 0 -> con que se rellena, 1 -> indica la posicion en este caso es de derecha a izquierda
        this.puntos = this.add.dynamicBitmapText(this.sys.game.config.width - 60, 7, 'pixel', Phaser.Utils.String.Pad(0, 6, 0, 1), 8);
    }
    addPoint() {
        this.puntos.setText(
            // el parseo esta para sumar enteros y no texto
            // suma de a 10 en 10 los puntos
            // 
            Phaser.Utils.String.Pad(parseInt(this.puntos.text) + 10, 6, 0, 1)
        );
    }

}

export default UI;