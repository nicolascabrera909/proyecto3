//var Armamento from './services/Armament.js';
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config');

//SOCKET.IO
const http = require('http');
const socketIO = require('socket.io');
var server = http.Server(app);
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5500",
  }
});

const players = {};

io.on('connection', function (socket) {
  console.log('User connected: ', socket.id);
  // create a new player and add it to our players object
  
  players[socket.id] = {
    // flipX: false,
    // x: Math.floor(Math.random() * 400) + 50,
    // y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id
  };
  
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('User disconnected: ', socket.id);
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('playerDisconnected', socket.id);
  });

  // when a plaayer moves, update the player data
  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].flipX = movementData.flipX;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
    // console.log('user Moved: ', socket.id);
  });
});

//CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null,true);
      if(!whitelist.includes(origin)) {
        const message = 'Error';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
let whitelist=['http://localhost','http://localhost:5500','http://localhost:5501','http://localhost:3000','http://127.0.0.1','http://127.0.0.1:5500','http://127.0.0.1:5501','http://127.0.0.1:3000','http://proyecto.sysmemories.com','http://proyecto.sysmemories.com:5500','http://proyecto.sysmemories.com:5501','http://proyecto.sysmemories.com:3000'];

//ROUTES
app.use(require('./routes/index'));

//LISTEN
server.listen(port, () => {
  console.log(`Express Server is running on port ${port}`);
})



//prueba
// let arma=new Armamento(10,15);

 //console.log('armamento'+ arma);
 //console.log("poder"+ arma.power);
 //arma.power=200;
 //console.log("poder"+arma.power);*/