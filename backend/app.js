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
    console.log('Emito currentPlayers');
    console.log('Emito broadcast newPlayer');
    socket.emit('currentPlayers', gamePlay.game.playerList,gamePlay);
    if (gamePlay.game.playerList[0].socketId == socket.id) {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[0]);
    } else {
      socket.broadcast.emit('newPlayer', gamePlay.game.playerList[1]);
    }

    //version original
    /*  socket.emit('currentPlayers', players);
      socket.broadcast.emit('newPlayer', players[socket.id]);*/
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
      socket.broadcast.emit('playerMoved', gamePlay.game.playerList[0],gamePlay);
    } else {
      gamePlay.game.playerList[1].boatList[0].positionX = movementData.x;
      gamePlay.game.playerList[1].boatList[0].positionY = movementData.y;
      gamePlay.game.playerList[1].boatList[0].rotation = movementData.rotation;
      if (gamePlay.game.playerList[0].boatTeam == 'submarino') {
        gamePlay.game.playerList[0].boatList[0].depth = movementData.depth;
      }
      socket.broadcast.emit('playerMoved', gamePlay.game.playerList[1],gamePlay);
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
            socket.broadcast.emit('playerMovedCarguero', gamePlay.game.playerList[d], id ,gamePlay);
          }
        }
      }
    }
  });

  socket.on('destroy_submarino', function (info) {
    socket.broadcast.emit('other_destroy_submarino', info,gamePlay)
  });

  socket.on('destroy_destructor', function (info) {
    socket.broadcast.emit('other_destroy_destructor', info,gamePlay)
  });

  /*socket.on('destroy_depthCharge', function (info) {
    socket.broadcast.emit('other_destroy_depthCharge', info)
  });*/

  socket.on('destroy_torpedo', function (info) {
    socket.broadcast.emit('other_destroy_torpedo', info,gamePlay)
  });
  
  socket.on('shootingTorpedo', function (info) {
    if (gamePlay.game.playerList[0].socketId == socket.id) {
      console.log('entro al shooting game 0')
      socket.broadcast.emit('other_shotTorpedo', gamePlay.game.playerList[0].boatList[0], gamePlay, gamePlay.game.playerList[0].socketId)
    } else {
      console.log('entro al shooting game 0')
      socket.broadcast.emit('other_shotTorpedo', gamePlay.game.playerList[1].boatList[0], gamePlay, gamePlay.game.playerList[0].socketId)
    }
  });

  socket.on('shootingCannon', function (info) {
    socket.broadcast.emit('other_shotCannon', info,gamePlay)
  });

  socket.on('shootingCannonDestructor', function (info) {
    socket.broadcast.emit('other_shotCannonDestructor', info,gamePlay)
  });

  socket.on('shootingDepthCharge', function (info) {
    socket.broadcast.emit('other_shotDepthCharge', info,gamePlay)
  });

  socket.on('surface', function (info) {
    socket.broadcast.emit('other_surface', info,gamePlay)
  });

  socket.on('immerse', function (info) {
    socket.broadcast.emit('other_immerse', info,gamePlay)
  });

  socket.on('deepImmerse', function (info) {
    socket.broadcast.emit('other_deepImmerse', info,gamePlay)
  });

  socket.on('depthChargeThrowing', function(info){
    console.log('envio al otro jugador info de la deep');
    socket.broadcast.emit('opponentThrowDepthCharge', info, gamePlay);
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
