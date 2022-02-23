const Boat = require('./Boat.js')

class Freighters extends Boat {

    /*Constructor*/
    constructor(coordenadas) {
        super();
        const Freighters = new Boat;
        this.positionX = coordenadas.x;
        this.positionY = coordenadas.y;
        this.boatLife = 100;
        this.visibility = 100;

    }


    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasCargueros(XMapaSize, YMapaSize) {

        /// cordenadas del mapa inicial es  width: 800,    height: 600,
        var xTotal = XMapaSize;
        var yTotal = YMapaSize;
        var mapaMitad = xTotal / 2;
        var listaCoordenadas = [];


        var coordenada = {
            "x": Math.random() * (mapaMitad - 0) + 0,
            "y": Math.random() * (yTotal - 0) + 0
        };
        listaCoordenadas.push(coordenada);
        for (var i = 0; i < 5; i++) {
            if (i < 3) {
                coordenada.y = coordenada.y + 10;
            } else {
                if (i == 3) {
                    coordenada.x =coordenada.x + 10;
                }
                coordenada.y = coordenada.y + 10;
            }
            listaCoordenadas.push(coordenada);
        }
        return listaCoordenadas;
    }
}
module.exports = Freighters;