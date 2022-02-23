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

        let coordenada = {
            "x": parseFloat(Math.random() * (mapaMitad - 0) + 0),
            "y": parseFloat(Math.random() * (yTotal - 0) + 0)
        };
       
        listaCoordenadas.push(coordenada);
        for (var i = 0; i < 5; i++) {
            let coordenadaAux =coordenada;
           
            if (i < 3) {
                coordenadaAux.y = parseFloat(coordenadaAux.y) +parseFloat(30);
            } else {
                if (i == 3) {
                    coordenadaAux.x =parseFloat(coordenadaAux.x) + parseFloat(30);
                }
                coordenadaAux.y = parseFloat(coordenadaAux.y) + parseFloat(30);
            }
            listaCoordenadas.push(coordenadaAux);
            coordenada=coordenadaAux;
        }
        return listaCoordenadas;
    }
}
module.exports = Freighters;