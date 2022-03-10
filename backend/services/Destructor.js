const DepthCharge = require("./DepthCharge")
const Cannon = require("./Cannon.js")
const Ship = require("./Ship.js")

class Destructor extends Ship {

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

    //Metodo que devuelve un arreglo de x e y
    coordenadas(listaCoordenadas, XMapaSize, YMapaSize) {
        var distanciaBarcos = 150;
        var x = new Number(listaCoordenadas[listaCoordenadas.length - 2].x + distanciaBarcos);
        var y = new Number(listaCoordenadas[listaCoordenadas.length - 2].y);
        this.positionX = x;
        this.positionY = y;
    }
}
module.exports = Destructor;