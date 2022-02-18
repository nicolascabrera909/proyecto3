//importo las clases que necesito
const games = require('./services/Games.js')


/*Declaro variables o contantes*/
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config');


const players = {};
const arrayPlayers = [];


/**SOCKET.IO configuracion**/
const http = require('http');
const socketIO = require('socket.io');
const server = http.Server(app);
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5500",
  }
});

/**Metodo de escucha de funcion conectar */
io.on('connection', function (socket) {
  console.log('Usuario conectado: ', socket.id);
  console.log('cantidad' + arrayPlayers.length);
  if (arrayPlayers.length < 2) {
    if (arrayPlayers.length == 0) {
      players[socket.id] = {
        // flipX: false,
        // x: Math.floor(Math.random() * 400) + 50,
        // y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id
      };
      arrayPlayers[0] = players;
      console.log("Jugador 1" + "\nX:" + players[socket.id].x + "\nY:" + players[socket.id].y);
    }
    else {
      players[socket.id] = {
        // flipX: false,

        // x: Math.floor(Math.random() * 400) + 50,
        // y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id
      };
      arrayPlayers[1] = players;
      console.log("Jugador 2" + "\nX:" + players[socket.id].x + "\nY:" + players[socket.id].y);
    }



    //Envio jugadores a nuevo jugador, en este punto me comunico con el front
    socket.emit('currentPlayers', players);

    //Actualizo a todos los jugadores sobre nuevo jugador,en este punto me comunico con el front
    socket.broadcast.emit('newPlayer', players[socket.id]);

    //Al desconectarse un usuario, se lo borra de jugadores,en este punto me comunico con el front
    socket.on('disconnect', function () {
      console.log('Usuario desconectado: ', socket.id);
      console.log(players);
      delete players[socket.id];
      io.emit('playerDisconnected', socket.id);
    });

    //Cuando se mueve un jugador se actualiza la informacion,en este punto me comunico con el front
    socket.on('playerMovement', function (movementData) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      //players[socket.id].flipX = movementData.flipX;
      socket.broadcast.emit('playerMoved', players[socket.id]);
    });

  }
  else {
    console.log("Juego completo. Intente mas tarde.");
  }
});

/**Metodo de escucha de funcion conectar */
io.on('nuevaPartida', function (name, boatList, socketId) {
  console.log('Nueva partida');
  var gamePLay = new Games();
  gamePLay.createGame(name,socketId);
});


//CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!whitelist.includes(origin)) {
        const message = 'Error';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
let whitelist = ['http://localhost', 'http://localhost:5500', 'http://localhost:5501', 'http://localhost:3000', 'http://127.0.0.1', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://127.0.0.1:3000', 'http://proyecto.sysmemories.com', 'http://proyecto.sysmemories.com:5500', 'http://proyecto.sysmemories.com:5501', 'http://proyecto.sysmemories.com:3000'];

//ROUTES
app.use(require('./routes/index'));

//LISTEN
server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
})

//prueba
// let arma=new Armamento(10,15);

 //console.log('armamento'+ arma);
 //console.log("poder"+ arma.power);
 //arma.power=200;
 //console.log("poder"+arma.power);*/