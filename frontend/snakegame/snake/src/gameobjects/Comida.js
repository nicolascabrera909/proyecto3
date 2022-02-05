class Comida {
    constructor(scene) {
        this.scene = scene;
        
        this.comida = this.scene.physics.add.group({
            key: 'comida',
            setXY: {
                x: 30,
                y: 30
            }
        });
        // esto es para hacer que la comida quede por detras de la serpiente
        this.comida.getChildren()[0].setOrigin(0).setDepth(-1);
    }

    crearComida() {
        // esto es para generar randomicamente la comida en la pantalla -> algo asi podemos usar para posicionar los bacos de arranque
        let x = Phaser.Math.Between(30, this.scene.sys.game.config.width - 30);
        let y = Phaser.Math.Between(30, this.scene.sys.game.config.height - 30);
        
        // es para por ejemplo si se crea una comida con un valor 14 en la x el snap lo que hace es reducirlo de a 10 en 10 en este caso. 
        // lo mismo para las y. EN este ejemplo 10 es como el redondeo
        x = Phaser.Math.Snap.To(x, 10);
        y = Phaser.Math.Snap.To(y, 10);
        
        // destruye la comida anterior previo a crear la nueva
        this.comida.getChildren()[0].destroy();
        // esto es para volver a crear la comida en la posicion x e y pasada
        this.comida.create(x, y, 'comida');
        this.comida.getChildren()[0].setOrigin(0).setDepth(-1);
    }
}

export default Comida;