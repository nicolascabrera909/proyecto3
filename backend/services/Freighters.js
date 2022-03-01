const Boat = require('./Boat.js')

class Freighters extends Boat {

    /*Constructor*/
    constructor(coordenadas,id) {
        super();
        const Freighters = new Boat;
        this.positionX = coordenadas.x;
        this.positionY = coordenadas.y;
        this.rotation =180;
        this.boatLife = 100;
        this.visibility = 100;
        this.type = 'carguero';
        this.id=id;

    }


    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasCargueros(XMapaSize, YMapaSize) {

        var xTotal = XMapaSize;
        var yTotal = YMapaSize-350;
        var mapaMitad = (xTotal / 5)*2;
        var listaCoordenadas = [];
        var distanciaBarcos = 150;
        var Xminimo= 450;
        var Yminimo= 100;
        
        for (var i = 0; i < 6; i++) {
            if (i == 0) {
                let x = new Number(Math.round(Math.random() * (mapaMitad -Xminimo ) + Xminimo));
                let y = new Number(Math.round(Math.random() * (yTotal -  Yminimo) + Yminimo));
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