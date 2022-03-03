/////////////////////////////////////////////////////// CLASES ///////////////////////////////////////////////////////
const Games = require('./services/Games.js');

/////////////////////////////////////////////////////// IMPORTS ///////////////////////////////////////////////////////
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config');

/////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// var players = {};
var gamePlay = new Games();
// var cantidad =0;
// var boat = 'boat';

/////////////////////////////////////////////////////// SOCKET CONFIG ////////////////////////////////////////////////
console.log("Creo y levanto el socket");
const http = require('http');
const socketIO = require('socket.io');
const { type } = require('os');
const server = http.Server(app);
const io = socketIO(server, {
  pingTimeout: 500000,
  cors: {
    origin: "http://localhost:5500",
  },
  cookie: {
    name: "my-cookie",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 86400
  }
});

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
  console.log('player [' + socket.id + '] connected')
  // players[socket.id] = {
  //   rotation: 0,
  //   x: 30,
  //   y: 30,
  //   boat: boat,
  //   cant: cantidad,
  //   playerId: socket.id
  // }
  // cantidad++;

  socket.emit('inicioInstancia', gamePlay);


  //evento de una partida nueva
  socket.on('createGame', function (name, boatTeam, difficulty) {

    //creo el juego con su jugador y barcos
    gamePlay.createGame(socket.id, name, boatTeam, difficulty);
    if (gamePlay.game.playerList.length == 2) {
      console.log('Emito salaEspera');
      socket.broadcast.emit('salaEspera');
      socket.emit('salaEspera');

    }
  });

    socket.on('initGame', function (name, boatTeam, difficulty) {
    console.log('Emito currentPlayers');
    console.log('Emito broadcast newPlayer');
    socket.emit('currentPlayers', gamePlay.game.playerList);
    if (gamePlay.game.playerList[0].socketId == socket.id) {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[0]);
    } else {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[1]);
    }
  });



  socket.on('disconnect', function () {
    console.log('player [' + socket.id + '] disconnected')
    gamePlay.deletePlayer(socket.id)
    io.emit('playerDisconnected', socket.id)
  })

  socket.on('playerMovement', function (movementData) {
    if (gamePlay.game.playerList[0].socketId == socket.id) {
      gamePlay.game.playerList[0].boatList[0].positionX = movementData.x;
      gamePlay.game.playerList[0].boatList[0].positionY = movementData.y;
      gamePlay.game.playerList[0].boatList[0].rotation = movementData.rotation;
      if (gamePlay.game.playerList[0].boatTeam == 'submarino') {
        gamePlay.game.playerList[0].boatList[0].depth = movementData.depth;
      }
      socket.broadcast.emit('playerMoved', gamePlay.game.playerList[0]);
    } else {
      gamePlay.game.playerList[1].boatList[0].positionX = movementData.x;
      gamePlay.game.playerList[1].boatList[0].positionY = movementData.y;
      gamePlay.game.playerList[1].boatList[0].rotation = movementData.rotation;
      if (gamePlay.game.playerList[0].boatTeam == 'submarino') {
        gamePlay.game.playerList[0].boatList[0].depth = movementData.depth;
      }
      socket.broadcast.emit('playerMoved', gamePlay.game.playerList[1]);
    }
  });

  socket.on('playerMovementCarguero', function (movementData, id) {

    for (var d = 0; d < gamePlay.game.playerList.length; d++) {
      if (gamePlay.game.playerList[d].socketId == socket.id) {
        for (var i = 0; i < gamePlay.game.playerList[d].boatList.length; i++) {
          if (gamePlay.game.playerList[d].boatList[i].type == 'carguero' &&
            gamePlay.game.playerList[d].boatList[i].id == id) {

            gamePlay.game.playerList[d].boatList[i].positionX = movementData.x;
            gamePlay.game.playerList[d].boatList[i].positionY = movementData.y;
            // gamePlay.game.playerList[d].boatList[i].rotation = movementData.rotation;
            socket.broadcast.emit('playerMovedCarguero', gamePlay.game.playerList[d], id);
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

  /*socket.on('destroy_depthCharge', function (info) {
    socket.broadcast.emit('other_destroy_depthCharge', info)
  });*/

  socket.on('destroy_torpedo', function (info) {
    socket.broadcast.emit('other_destroy_torpedo', info)
  });

  socket.on('shooting', function (info) {
    socket.broadcast.emit('other_shot', info)
  });

  socket.on('shootingCannon', function (info) {
    socket.broadcast.emit('other_shotCannon', info)
  });

  socket.on('shootingCannonDestructor', function (info) {
    socket.broadcast.emit('other_shotCannonDestructor', info)
  });

  socket.on('shootingDepthCharge', function (info) {
    socket.broadcast.emit('other_shotDepthCharge', info)
  });

  socket.on('surface', function (info) {
    socket.broadcast.emit('other_surface', info)
  });

  socket.on('immerse', function (info) {
    socket.broadcast.emit('other_immerse', info)
  });

  socket.on('deepImmerse', function (info) {
    socket.broadcast.emit('other_deepImmerse', info)
  });

  socket.on('depthChargeThrowing', function (info) {
    console.log('envio al otro jugador info de la deep');
    socket.broadcast.emit('opponentThrowDepthCharge', info);
  });

});
/////////////////////////////////////////////////////////  ROUTES  /////////////////////////////////////////////////////
app.use(require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 404
app.use(function (req, res, next) {
  res.status(404).send("Lo siento. No pudimos encontrar eso.")
});

// Error
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Algo esta roto!')
});

///////////////////////////////////////////////////////  LISTEN  ////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
});
