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
var gamePlay = new Games(level);

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
//var gamePLay = new Games(10);

//io.on('connection', function (name, bandoBarcos, socketId, level) {
io.on('connection', function (socket) {
  console.log('player [' + socket.id + '] connected')
  //valido si la lita esta vacia
  console.log("luego de la conexion");
  if (listaGame.length === 0) {
    console.log('Nueva partida');
  }

  socket.on('createGame', function (name, bandoBarcos, level, mapa, dificultad) {
    console.log('Player 1 [' + socket.id + '] connected')
    //valido si la lita esta vacia
    if (!gamePlay.getGameList().length > 0) {
      console.log('Creo una instancia de juego');
      var listaGame = gamePLay.createGame(name, bandoBarcos, socket.id, mapa, dificultad);
      // console.log(gamePLay);
      console.log(gamePLay.gameList);
      console.log(socket.id);
      //emito datos al frontend
      console.log('emito los datos al front');
      var jsonGame = JSON.stringify(gamePLay.gameList);
      console.log('esto es un json -> ' + jsonGame);
      io.emit('losJuegos', jsonGame);
      console.log('termine de crear la partida y emiti al frontend');
    } else {
      // creo el jugador dos y lo uno a la partida
    }

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

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//LISTEN
server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
})
