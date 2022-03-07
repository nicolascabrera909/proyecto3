const DepthCharge = require("./DepthCharge")
const Cannon = require("./Cannon.js")
const Ship = require("./Ship.js")

class Destructor extends Ship {

    /*Constructor*/
    constructor(/*dificulty*/) {
        super();

        this.carga = new DepthCharge();
        this.carga.setPower(150);
        this.carga.setDistance(100);
        this.carga.setCantMunicion(30);
        this.carga.setTime(10);
        this.carga.setDepth();
        this.cannon = new Cannon(30);

        //let coordenadas = this.coordenadas(mapa.getWidth(), mapa.getHeight());
        this.positionX = 0
        this.positionY = 0
        this.rotation =180;
        this.boatLife = 100;
        this.visibility = 100;
        //this.dificulty = dificulty;
        this.type = 'destructor';
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
        var distanciaBarcos = 150;

        var x = new Number(listaCoordenadas[listaCoordenadas.length - 2].x + distanciaBarcos);
        var y = new Number(listaCoordenadas[listaCoordenadas.length - 2].y);
        this.positionX = x;
        this.positionY = y;


        //itero hasta encontrar un par de coordenadas que se diferente a los  cargueros
        /* while (itero) {
             this.positionX = Math.round(Math.random() * ((mapaMitad - distanciaBarcos) - 100) + 0);
             this.positionY = Math.round(Math.random() * ((yTotal - distanciaBarcos) - (distanciaBarcos)) + 0);
 
             //recorro la listade cordenadas y comparo los x e y de los cargueros contra las calculadas de forma random
             for (let j = 0; j < listaCoordenadas.length; j++) {
                 if (this.positionX == listaCoordenadas[j].x && this.positionY == listaCoordenadas[j].y) {
                     repetido = True;
                 }
             }
 
             if (!repetido) {
                 console.log('no estan repetidas, me quedo con las coordendas');
                 itero = false;
             }
 
         }*/

    }
}
module.exports = Destructor;