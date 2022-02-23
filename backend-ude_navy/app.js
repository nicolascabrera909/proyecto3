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
let cantUsers = 0;
var gamePlay = new Games();

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


//io.on('connection', function (name, bandoBarcos, socketId, level) {
io.on('connection', function (socket) {
  console.log('player [' + socket.id + '] connected');

  //iniciar instancia del juego, Games 
  //console.log('****************************************'+JSON.stringify(gamePlay));
  io.emit('inicioInstancia', JSON.stringify(gamePlay));


  //evento de una partida nueva
  socket.on('createGame', function (name, boatTeam, mapa, difficulty) {
      //console.log('Evento create game ');
      gamePlay.createGame(name, boatTeam, socket.id, mapa, difficulty);
      var jsonGame = JSON.stringify(gamePlay);
      //console.log('Luego de convertir a JSON: ' + jsonGame);
      //emito datos al frontend
      io.emit('listenerCreateGame', jsonGame);
      //console.log('termine de crear la partida y emiti al frontend');
    /*else {
      console.log('Ya hay una partida en juego, ' + gamePlay.getGameList[0].playerList[0]+' vs '+ gamePlay.getGameList[0].playerList[1]);
      // creo el jugador dos y lo uno a la partida
    }*/

  });

});

/**Metodo de escucha de funcion conectar */
io.on('nuevaPartida', function (name, boatList, socketId) {
  console.log('Nueva partida');
  var gamePLay = new Games();
  gamePLay.createGame(name, socketId);
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

//LISTEN
server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
});
