//importo las clases que necesito
const Games = require('./services/Games.js');

/*Declaro variables o contantes*/
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config');

//variables del juego
const players = {};
let gameRedy = false;
var gamePlay = new Games();



/////////////////////////////////////////////////////// Socket config ///////////////////////////////////////////////////////

/**SOCKET.IO configuracion**/
console.log("Creo y levanto el socket");
const http = require('http');
const socketIO = require('socket.io');
const server = http.Server(app);
const io = socketIO(server, {
  pingTimeout: 8000,
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


io.on('connection', function (socket) {
  console.log('player [' + socket.id + '] connected');

  //iniciar instancia del juego, Games 
  io.emit('inicioInstancia', JSON.stringify(gamePlay));


  //evento de una partida nueva
  socket.on('createGame', function (name, boatTeam, mapa, difficulty) {

    var player = {};
    player[socket.id] = {'name': name,
                         'boatList': [],
                         'socketId': socket.id,
                         'boatTeam': boatTeam
    }
                  

    //console.log('player' + JSON.stringify(player));
    if (gamePlay.gameList.length < 2) {
      gamePlay.createGame(player[socket.id], socket.id, mapa, difficulty);
      var jsonGame = JSON.stringify(gamePlay);
      //console.log('Luego de convertir a JSON: ' + jsonGame);
      //emito datos al frontend
      socket.emit('currentPlayers', gamePlay, gamePlay.gameList[0].playerList);
      let newJugador;
      if (gamePlay.gameList[0].playerList[0].socketId == socket.id){
        newJugador = gamePlay.gameList[0].playerList[0];
      }else{
        newJugador = gamePlay.gameList[0].playerList[1];
      }
      
      socket.broadcast.emit('newPlayer', gamePlay, newJugador);
      

    } else {
      nullGame = {
        gameList: [],
      }
      var nullJson = JSON.stringify(nullGame);
      io.emit('currentPlayers', nullJson);
    }
  });

  socket.on('mapSize', function (width, height) {
    gamePlay.map.setWidth(width);
    gamePlay.map.setHeight(height);
  });


  socket.on('createGameFinish', function (listo) {
    // aca mando al socket al evento del html pre_game
    io.emit('bothUsers', true);
  });

  socket.on('movimientoSubmarino', () => {
    socket.broadcast.emit('movimientoDetectadoSubmarino');
  });
  socket.on('movimientoDestructor', () => {
    socket.broadcast.emit('movimientoDetectadoDestructor');
  });

  //desconectar al usuario y modificar la lista de jugadores
  socket.on('disconnect', function () {
    if (gamePlay.gameList.length > 0) {
      console.log('player [' + socket.id + '] disconnected')
      gamePlay.deletePlayer(socket.id);
      socket.broadcast.emit('playerDisconnected', socket.id)
    }
  })

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////  ROUTES  ///////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







///////////////////////////////////////////////////////  LISTEN  ////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////