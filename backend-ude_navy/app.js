//importo las clases que necesito
const Games = require('./services/Games.js')


/*Declaro variables o constantes*/
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config');

//variables del juego
const players = {};
var cantUsers = 0;
var listaGame = [];

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

//Obtengo nombre ingresado en el html
/*let tipoBarco = document.getElementById('tipoBarco');
let send = document.getElementById('send');


send.addEventListener('click', function () {
  console.log(player.value);
  tipoBarcoSeleccionado = tipoBarco.value;
});*/


//muestra en el log al jugador
/*
name -> nombre de usuario
bandoBarcos -> tipo de barco
socketId -> id del usuario de socket
level -> nivel de dificultad del juego
*/

io.on('connection', function (name, bandoBarcos, socketId, level) {
  console.log('player [' + socketId + '] connected')
  //valido si la lita esta vacia
  if (listaGame.length === 0) {
    console.log('Nueva partida');
    //creo una instacia de todos los juegos y agrego a la lista de juegos
    var gamePLay = new Games(level);

    gamePLay.createGame(name, bandoBarcos, socketId);
    //emito datos al frontend
    console.log('termine de crear la partida y emiti al frontend');
  } else {
    //valido si la partida no esta llena
    if (listaGame.length > 1) {
      //emitir mensaje para el frontend, que no se puede agregar mas jugadores
    } else {
      console.log('player 2 [' + socketId + '] connected')
      console.log('Uniendo a partida');
      gamePLay[0].getPlayerList().push(player2);
    }

  }



  socket.emit('currentPlayers', players)
  socket.broadcast.emit('newPlayer', players[socket.id])

  socket.on('disconnect', function () {
    console.log('player [' + socket.id + '] disconnected')
    delete players[socket.id]
    io.emit('playerDisconnected', socket.id)
  })





  /*
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
  });*/

  /**Metodo de escucha de funcion conectar */
  io.on('nuevaPartida', function (name, boatList, socketId) {
    console.log('Nueva partida');
    var gamePLay = new Games();
    gamePLay.createGame(name, socketId);
  });
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
  });


