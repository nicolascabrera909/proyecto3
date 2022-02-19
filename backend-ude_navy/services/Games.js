//importo las clases que necesito
const player = require('./Player.js')
const game = require('./Game.js')
const submarino = require('./Submarine.js')
const cannon = require('./Cannon.js')
const torpedo = require('./Torpedo.js')

class Games {


    /*Constructor*/
    constructor() {
        this.gameList = [];
    }

    createGame(name, bandoBarcos, socketId) {

        
        //creo la lista de jugadores de la partida
        var playerList = [];
        if (bandoBarcos === 'submarino') {
            //obtengo coordenadas del submarino y lo creo
            var coordenadas = coordenadasSubmarino();
            var elTorpedo = new Cannon();
            elTorpedo.setPower(150);
            elTorpedo.setDistance(100);
            elTorpedo.setCantMunicion(30);
            var elCanoon = new Torpedo();
            elCanoon.setDistance(150);
            elCanoon.setPower(500);
            elCanoon.setCantMunicion(30);
            var elSubmarino = new Submarine(1, elTorpedo, elCanoon);
            elSubmarino.setPositionX(coordenadas.x);
            elSubmarino.setPositionY(coordenadas.y);
            elSubmarino.setBoatlife(100);
            elSubmarino.setBoatlife(100);
            player.setBoatList().push(elSubmarino);
            //agrego al jugador a la lista de jugadores
            playerList.push(player);
            //creo el jugador
            var player = new Player(playerList,name, socketId);
            //creo variable nivel y dificultad, estos datos los podemos definir en la base de datos
            var nivel = 1;
            var mapaId = 1;
            //creo la partida
            var match = new Game(playerList, mapaId, nivel);
            //inserta al final del array
            this.gameList.push(match);

        } else {
            var coordenadas = coordenadasSubmarino();
            var laDepthCharge = new laDepthCharge(1, 1);
            var elCanoon = new Torpedo();
            elCanoon.setDistance(150);
            elCanoon.setPower(500);
            elCanoon.setCantMunicion(30);
            var elSubmarino = new Submarine(1, elTorpedo, elCanoon);
            elSubmarino.setPositionX(coordenadas.x);
            elSubmarino.setPositionY(coordenadas.y);
            elSubmarino.setBoatlife(100);
            elSubmarino.setBoatlife(100);
            player.setBoatList().push(elSubmarino);
        }

        //creo la lista de botes y se la asigno al jugadores

        //


    }

    saveGame(String) {
        //guarda la partida 
    }

    laodGame() {
        //carga la partida
    }




    /**Este metodo devuelve un arreglo de x e y*/
    coordenadasCargueros() {

        /// cordenadas del mapa inicial es  width: 800,    height: 600,
        var xTotal = 800;
        var yTotal = 600;
        var mapaMitad = xTotal / 2;
        var listaCoordenadas = [];


        coordenada = {
            "x": Math.random() * (mapaMitad - 0) + 0,
            "y": Math.random() * (yTotal - 0) + 0
        };
        listaCoordenadas.push(coordenada);
        for (var i = 0; i < 5; i++) {
            if (i < 3) {
                coordenada.y = y + 10;
            } else {
                if (i == 3) {
                    coordenada.x = x + 10;
                }
                coordenada.y = y + 10;
            }
            listaCoordenadas.push(coordenada);
        }
        var noEsIgual = false;
        var contador = 0;
        while (!esIgual) {
            coordenada.x = Math.random() * (mapaMitad - 0) + 0;
            coordenada.y = Math.random() * (yTotal - 0) + 0;
        };
        for (var j = 0; j < listaCoordenadas.length; j++) {
            if ((coordenada.x == listaCoordenadas[j].x && coordenada.y == listaCoordenadas[j].y)) {
                contador++;
            }
        }
        if (contador == 6) {
            noEsIgual = true;
            listaCoordenadas.push(coordenada);
        } else {
            contador = 0;
        }
        return listaCoordenadas;
    }







}




