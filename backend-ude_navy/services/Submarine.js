class Submarine extends Ship {

    /*Constructor*/
    constructor(depth) {
        super();
        this.depth = depth;
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


}
