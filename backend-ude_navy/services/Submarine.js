//import Torpedo from "./Torpedo.js";
//import Cannon from "./Cannon.js";
import Cannon from './Cannon.js'
import Torpedo from'./Torpedo.js'
import Ship from './Ship.js'

class Submarine {
    
    /*Constructor*/
    constructor(mapa, dificultad) {
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
        const coordenadas = this.coordenadasSubmarino(800,600);
        this.positionX = coordenadas.x;
        this.positionY = coordenadas.y;
        this.boatLife = 100;
        this.visibility = 100;
        this.dificultad = dificultad;

    }

    /*Geters and seters*/
    getDepth() {
        return this.depth;
    }

    setDepth(depth) {
         this.depth=depth;
    }

    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasSubmarino(tamañoXMapa, tamañoYmapa) {

        /// cordenadas del mapa inicial es  width: 800,    height: 600,
        const xTotal = tamañoXMapa ;
        const yTotal = tamañoYmapa ;
        const mapaMitad = xTotal / 2;

        //calculo numero ramdom
        const x1 = Math.random() * (mapaMitad - xTotal) + mapaMitad;
        const y1 = Math.random() * (yTotal - 0) + 0;
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

export default Submarine;
