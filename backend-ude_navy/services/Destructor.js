const DepthCharge = require("./DepthCharge")
const Cannon = require("./Cannon.js")
const Ship = require("./Ship.js")

class Destructor extends Ship{

    /*Constructor*/
    constructor(dificulty) {
        super();

        this.carga = new DepthCharge();
        this.carga.setPower(150);
        this.carga.setDistance(100);
        this.carga.setCantMunicion(30);
        this.carga.setTime(10);
        this.carga.setDepth();
        this.cannon = new Cannon();
        this.cannon.setDistance(150);
        this.cannon.setPower(500);
        this.cannon.setCantMunicion(30);

        //let coordenadas = this.coordenadas(mapa.getWidth(), mapa.getHeight());
        this.positionX = 0
        this.positionY = 0
        this.boatLife=100;
        this.visibility=100;
        this.dificulty = dificulty;

    }

    getCarga() {
        return this.carga;
    }
    getCannon() {
        return this.cannon;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getVisibility() {
        return this.visibility;
    }
    getDificulty() {
        return this.dificulty;
    }


    /**Este metodo devuelve un arreglo de x e y*/
    coordenadas(listaCoordenadas, XMapaSize, YMapaSize) {


        /// cordenadas del mapa inicial y  mas variables
        var xTotal = XMapaSize;
        var yTotal = YMapaSize;
        var mapaMitad = xTotal / 2;
        var noEsIgual = false;
        var contador = 0;
        var coordenada = {
            x: 0,
            y: 0
        }
        //itero hasta encontrar un par de coordenadas que se diferente a los  cargueros
        while (!noEsIgual) {
            coordenada.x = Math.random() * (mapaMitad - 0) + 0;
            coordenada.y = Math.random() * (yTotal - 0) + 0;
            //recorro la listade cordenadas y comparo los x e y de los cargueros contra las calculadas de forma random
            for (var j = 0; j < listaCoordenadas.length; j++) {
                if ((coordenada.x == listaCoordenadas[j].x && coordenada.y == listaCoordenadas[j].y)) {
                    contador++;
                }
            }
            if (contador == 6) {
                noEsIgual = true;
            } else {
                contador = 0;
            }
        }
        return coordenada;
    }

}
module.exports = Destructor;