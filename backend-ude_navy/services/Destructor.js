const DepthCharge = require("./DepthCharge")
const Cannon = require("./Cannon.js")

class Destructor{
    
    /*Constructor*/
    constructor(mapa, dificultad) {
        Destructor.prototype = new Ship;
       //super();
       this.depth = depth;// 1 superficie, 2 sumergido y 3sumergido proufundo
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
       let coordenadas = this.coordenadas(mapa.getWidth(), mapa.getHeight());
       this.positionX = coordenadas.x;
       this.positionY = coordenadas.y;
       this.boatLife.setBoatlife(100);
       this.visibility.setVisibility(100);
       this.dificultad = dificultad;
   }

   /**Este metodo devuelve un arreglo de x e y*/
   coordenadas(tamañoXMapa, tamañoYmapa) {

    /// cordenadas del mapa inicial es  width: 800,    height: 600,
    var xTotal = tamañoXMapa * this.dificultad.multiplierMap;
    var yTotal = tamañoYmapa * this.dificultad.multiplierMap;
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

}
module.exports = Destructor;