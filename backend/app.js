/////////////////////////////////////////////////////// CLASES ///////////////////////////////////////////////////////
const Games = require('./services/Games.js');

/////////////////////////////////////////////////////// IMPORTS ///////////////////////////////////////////////////////
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config');

/////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////
var gamePlay = new Games();
let cantidad = 0;
let pleyerListIni = [];
let cargada = false;
let cancelar = false;
let contador = 0;
let cancelada = false;
let contadorCancel = 0;

/////////////////////////////////////////////////////// SOCKET CONFIG ///////////////////////////////////////////////
const http = require('http');
const socketIO = require('socket.io');
const { type } = require('os');
const server = http.Server(app);
const io = socketIO(server, {
  pingTimeout: 50000,
  cors: {
    origin: "http://proyecto.sysmemories.com",
  },
  cookie: {
    name: "my-cookie",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 86400
  }
});

console.log("Socket levantado");








///////////////////////////////////////////////////////  CORS  ///////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////// SOCKET ///////////////////////////////////////////////////////
io.on('connection', function (socket) {
  console.log('Player [' + socket.id + '] connected')
  cancelar=false;
  
  gamePlay.cancel=false;
  console.log(cancelar);
  if (contador == 0) {
    cargada = gamePlay.loadingRedy();
    contador++;
  }

 

  socket.on('listenCancel', function () {
    cancelar= gamePlay.askCancel();
   if(cancelar){
    socket.emit('canceledGame', socket.id);
    socket.broadcast.emit('canceledGame', socket.id);
    cancelar=false;
   }
  });

  socket.emit('inicioInstancia', gamePlay, cargada);

  //Partida nueva
  socket.on('createGame', function (name, boatTeam, difficulty) {
    //Creo el juego con su jugador y barcos
    gamePlay.game=gamePlay.createGame(socket.id, name, boatTeam, difficulty);
    socket.emit('currentPlayers', gamePlay.game.playerList, gamePlay);

    if (gamePlay.game.playerList[0].socketId == socket.id) {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[0]);
    } else {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[1]);
    }
  });

  

  socket.on('loadGame', function (soketId) {
    //creo el juego con su jugador y barcos
    console.log('Emito currentPlayers');
    console.log('Emito broadcast newPlayer');
    //selecciono primer player
    if (cantidad == 0) {
      gamePlay.game.playerList[0].socketId = soketId;
      pleyerListIni.push(gamePlay.game.playerList[cantidad]);
      cantidad++;
    } else {
      gamePlay.game.playerList[1].socketId = soketId;
      pleyerListIni = gamePlay.game.playerList;
    }
    socket.emit('currentPlayers', pleyerListIni, gamePlay);
    if (gamePlay.game.playerList[0].socketId == socket.id) {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[0]);
    } else {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[1]);
    }
  });

  socket.on('disconnect', function () {
    console.log('Player [' + socket.id + '] disconnected')
    cancelar=false;
    cargada=false;
    contador=0;
    console.log(cancelar);
    gamePlay.deletePlayer(socket.id)
    io.emit('playerDisconnected', socket.id)
  })

  socket.on('playerMovement', function (movementData) {
    if (gamePlay.game != null) {
      if (gamePlay.game.playerList[0].socketId == movementData.socketId) {
        gamePlay.game.playerList[0].boatList[0].positionX = movementData.x;
        gamePlay.game.playerList[0].boatList[0].positionY = movementData.y;
        gamePlay.game.playerList[0].boatList[0].rotation = movementData.rotation;
        gamePlay.game.playerList[0].boatList[0].boatLife = movementData.life;
        if (gamePlay.game.playerList[0].boatTeam == 'submarino') {
          gamePlay.game.playerList[0].boatList[0].depth = movementData.depth;
        }
        socket.broadcast.emit('playerMoved', gamePlay.game.playerList[0], gamePlay);
      } else {
        gamePlay.game.playerList[1].boatList[0].positionX = movementData.x;
        gamePlay.game.playerList[1].boatList[0].positionY = movementData.y;
        gamePlay.game.playerList[1].boatList[0].rotation = movementData.rotation;
        gamePlay.game.playerList[1].boatList[0].boatLife = movementData.life;
        if (gamePlay.game.playerList[1].boatTeam == 'submarino') {
          gamePlay.game.playerList[1].boatList[0].depth = movementData.depth;
        }
        socket.broadcast.emit('playerMoved', gamePlay.game.playerList[1], gamePlay);
      }
    }

  });

  socket.on('playerMovementCarguero', function (movementData, id) {
    if (gamePlay.game != null) {
      //let socketId = gamePlay.whoWins();
      // if (socketId !== 'empate') {
      //   socket.broadcast.emit('who_wins', socketId);
      //   socket.emit('who_wins', socketId);
      // }
      for (var d = 0; d < gamePlay.game.playerList.length; d++) {
        if (gamePlay.game.playerList[d].socketId == socket.id) {
          for (var i = 0; i < gamePlay.game.playerList[d].boatList.length; i++) {
            if (gamePlay.game.playerList[d].boatList[i].type == 'carguero' &&
              gamePlay.game.playerList[d].boatList[i].id == id) {

              gamePlay.game.playerList[d].boatList[i].positionX = movementData.x;
              gamePlay.game.playerList[d].boatList[i].positionY = movementData.y;
              // gamePlay.game.playerList[d].boatList[i].rotation = movementData.rotation;
              socket.broadcast.emit('playerMovedCarguero', gamePlay.game.playerList[d], id, gamePlay);
            }
          }
        }
      }
    }
  });

  socket.on('destroy_submarino', function (info) {
    socket.broadcast.emit('other_destroy_submarino', info)
  });

  socket.on('destroy_destructor', function (info) {
    socket.broadcast.emit('other_destroy_destructor', info)
  });


  socket.on('destroy_torpedo', function (info) {
    socket.broadcast.emit('other_destroy_torpedo', info)
  });

  socket.on('destroy_cannons', function (info) {
    socket.broadcast.emit('other_destroy_cannons', info)
  });

  socket.on('destroy_depthCharge', function (info) {
    socket.broadcast.emit('other_destroy_depthCharge', info)
  });

  socket.on('shootingTorpedo', function (info) {
    socket.broadcast.emit('other_shotTorpedo', info)
  });

  socket.on('shootingCannon', function (info) {
    socket.broadcast.emit('other_shotCannon', info)
  });

  socket.on('shootingDepthCharge', function (info) {
    socket.broadcast.emit('other_shotDepthCharge', info)
  });

  socket.on('changeDepth', function (info) {
    socket.broadcast.emit('other_changeDepth', info)
    if (gamePlay.game.playerList[0].socketId == socket.id) { }

  });

  socket.on('depthChargeThrowing', function (info) {
    socket.broadcast.emit('other_shotDepthCharge', info);
  });

  socket.on('finishGame', function (socket_id) {
    console.log('Juego terminado');
    socket.broadcast.emit('finishedGame', socket_id);
  });

  

  socket.on('emit_clock', function (info) {
    socket.broadcast.emit('other_emit_clock', info)
  });

  socket.on('submarino_wins', function (info) {
    console.log('Juego terminado');
    socket.broadcast.emit('other_submarino_wins', info);
  });

  socket.on('destructor_wins', function (info) {
    console.log('Juego terminado');
    socket.broadcast.emit('other_destructor_wins', info);
  });

  socket.on('carguero_wins', function (info) {
    console.log('Juego terminado');
    socket.broadcast.emit('other_carguero_wins', info);
  });

  socket.on('empate', function (info) {
    console.log('Juego terminado en empate');
    socket.broadcast.emit('other_empate', info);
  });

  socket.on('destroy_carguero', function (info) {
    socket.broadcast.emit('other_destroy_carguero', info);
  });

});











/////////////////////////////////////////////////////////  ROUTES  /////////////////////////////////////////////////////
app.use(require('./routes/index'));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// 404
app.use(function (req, res, next) {
  res.status(404).send("Lo siento. No pudimos encontrar eso.")
});

// Error
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Algo esta roto!')
});



//clase prueba
//gamePlay.saveGame();

///////////////////////////////////////////////////////  LISTEN  ////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
});


