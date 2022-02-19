import Torpedo from "./Torpedo.js";
import Cannon from "./Cannon.js";

class Submarine extends Ship {

    /*Constructor*/
    constructor(coordenadas) {
        super();
        this.depth.setDepth(1);// 1 superficie, 2 sumergido y 3sumergido proufundo
        this.torpedo = new Torpedo();
        this.torpedo.setPower(150);
        this.torpedo.setDistance(100);
        this.torpedo.setCantMunicion(30);
        this.cannon = new Cannon();
        this.cannon.setDistance(150);
        this.cannon.setPower(500);
        this.cannon.setCantMunicion(30);
        this.positionX = coordenadas.x;
        this.positionY = coordenadas.y;
        this.boatLife.setBoatlife(100);
        this.visibility.setVisibility(100);
    }

    /*Geters and seters*/
    getDepth() {
        return this.depth;
    }

    setDepth(depth) {
         this.depth=depth;
    }

    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasSubmarino(bandoBaco, tamañoXMapa, tamañoYmapa) {

        /// cordenadas del mapa inicial es  width: 800,    height: 600,
        var xTotal = 800;
        var yTotal = 600;
        var mapaMitad = xTotal / 2;

        //calculo numero ramdom
        var x1 = Math.random() * (mapaMitad - xTotal) + mapaMitad;
        var y1 = Math.random() * (yTotal - 0) + 0;
        coordenada = {
            "x": x1,
            "y": y1
        };
        return coordenada;
    }

    //Crea submarino con el armamento y recibe las coordenadas por parametros
    
    createSubmarine (coorX, coorY){
        
    }
    


}
