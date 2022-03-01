const Cannon = require('./Cannon.js')
const Torpedo = require('./Torpedo.js')
const Ship = require('./Ship.js')

class Submarine {
    
    /*Constructor*/
    constructor(map) {
        const Submarine = new Ship;
        //super();
        this.depth=1;// 1 superficie, 2 sumergido y 3 sumergido proufundo
        
        this.torpedo = new Torpedo();
        this.torpedo.power=100;
        this.torpedo.distance=100;
        this.torpedo.cantMunicion=30;

        this.cannon = new Cannon();
        this.cannon.power = 100;
        this.cannon.distance = 100;
        this.cannon.cantMunicion = 30;
        
        /*mapa.getWidth(), mapa.getHeight()*/
        const coordenadas = this.coordenadasSubmarino(map.getWidth(), map.getHeight());
        this.rotation =180;
        this.positionX = coordenadas.x;
        this.positionY = coordenadas.y;
        this.boatLife = 100;
        this.visibility = 100;
        this.type = 'submarino';

    }

    /*Geters and seters*/
    getDepth() {
        return this.depth;
    }

    getType() {
        return this.type;
    }
    setDepth(depth) {
         this.depth=depth;
    }

    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasSubmarino(tamañoXMapa, tamañoYmapa) {

        /// cordenadas del mapa inicial es  width: 800,    height: 600,
        const xTotal = tamañoXMapa-500;
        const yTotal = tamañoYmapa-100;
        const mapaMitad = (xTotal / 4)*3;
        const rangoBordes=100;

        //calculo numero ramdom
        const x1 = new Number (Math.round(Math.random() * (xTotal -  mapaMitad) + (mapaMitad)));
        const y1 = new Number (Math.round(Math.random() * (yTotal - rangoBordes) + rangoBordes));
        const coordenada = {
            "x": x1,
            "y": y1
        };
        return coordenada;
    }

    //Crea submarino con el armamento y recibe las coordenadas por parametros
    
    createSubmarine (coorX, coorY){
        
    }
    


}

module.exports = Submarine;