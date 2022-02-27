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
        this.type = 'carguero';

    }


    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasCargueros(XMapaSize, YMapaSize) {

        var xTotal = XMapaSize;
        var yTotal = YMapaSize;
        var mapaMitad = xTotal / 3;
        var listaCoordenadas = [];
        var distanciaBarcos = 150;
        
        for (var i = 0; i < 6; i++) {
            if (i == 0) {
                let x = new Number(Math.round(Math.random() * (mapaMitad - (distanciaBarcos )) - 0) + distanciaBarcos*2);
                let y = new Number(Math.round(Math.random() * (yTotal - distanciaBarcos) - 0) + 0);
                let coordenada = {
                    "x": x,
                    "y": y
                };
                listaCoordenadas.push(coordenada);
            } else {
                let coordenada = {
                    "x": 0,
                    "y": 0
                };

                if (i < 3 && i > 0) {
                    let y1 = new Number(listaCoordenadas[i - 1].y + (distanciaBarcos));
                    coordenada.y = y1;
                    coordenada.x = listaCoordenadas[i - 1].x;
                } else {
                    if (i == 3) {
                        let x1 = new Number(listaCoordenadas[0].x + distanciaBarcos);
                        coordenada.x = x1;
                        coordenada.y = new Number(listaCoordenadas[0].y );
                    }
                    if (i > 3) {
                        let y1 = new Number(listaCoordenadas[i - 1].y + distanciaBarcos);
                        coordenada.y = y1;
                        coordenada.x = listaCoordenadas[i - 1].x;
                    }
                }
                listaCoordenadas.push(coordenada);
            }
        }
        return listaCoordenadas;
    }
}
module.exports = Freighters;