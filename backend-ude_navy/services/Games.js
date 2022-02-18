//import Game from "./Game.js";
const Game = require('./Games.js');

class Gamers {

    /*Constructor*/
    constructor(gameList) {
        this.gameList = gameList;
    }

    createGame() {
        //inserta al final del array

    }

    saveGame(String) {
        //guarda la partida 
    }

    laodGame() {
        //carga la partida
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

    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasCargueros(bandoBaco, tamañoXMapa, tamañoYmapa) {

        /// cordenadas del mapa inicial es  width: 800,    height: 600,
        var xTotal = 800;
        var yTotal = 600;
        var mapaMitad = xTotal / 2;
        var listaCoordenadas = [];



        coordenada = {
            "x": Math.random() * (mapaMitad - 0) + 0,
            "y": Math.random() * (yTotal - 0) + 0
        };
        listaCoordenadas.pushcoordenada
        for (var i = 0; i < 5; i++) {
            if (i < 3) {
                coordenada.y = y + 10;
            } else {
                if (i == 3) {
                    coordenada.x = x + 10;
                }
                coordenada.y = y + 10;
            }
        }
        var j = 0;
        coordenada = {
            "x": Math.random() * (mapaMitad - 0) + 0,
            "y": Math.random() * (yTotal - 0) + 0
        };
        var noEsIgual = false;
        var contador = 0;
        while (!esIgual) {
            for (var j = 0; j < listaCoordenadas.length; j++) {
                if (coordenada.x == listaCoordenadas[j].x && coordenada.y == listaCoordenadas[j].y) {
                    coordenada = {
                        "x": Math.random() * (mapaMitad - 0) + 0,
                        "y": Math.random() * (yTotal - 0) + 0
                    };
                } else {
                    contador ++;

                }
            }
            if(contador==6){
                noEsIgual=true;  
            }else{
                contador=0;
            }
        }
        return listaCoordenadas;
    }




}




