//importo las clases que necesito
import Games from './services/Games.js'
import cors from 'cors';
import { createServer } from "http";
import Router from './routes/index.js'
/*Declaro variables o constantes*/
// const express = require('express');
import express from 'express';

const app = express();
const port = 3000;

//import { database } from './config.js';
app.use('/', Router);

//variables del juego
const players = {};
let cantUsers = 0;
let listaGame = [];
 

/**SOCKET.IO configuracion**/

import http from 'http';
//import * as socketIO from 'socket.io';
import { Server } from "socket.io";
//const io = socketIO();
//Server = http.Server(app);
const httpServer = createServer();
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5500",
  }
});
/*io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5500",
  }
});*/

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
  if (listaGame.length === 0) {
    console.log('Nueva partida');
  }

  socket.on('createGame', function (name, bandoBarcos, socketId, level) {
    console.log('player [' + socketId + '] connected')
    //valido si la lita esta vacia
    console.log('New Game' + name + ' - ' + bandoBarcos + ' - ' + level);
    //creo una instacia de todos los juegos y agrego a la lista de juegos
    console.log('antes de new');
    const gamePLay = new Games(level);

    console.log('antes gamePLay.createGame');
    gamePLay.createGame(name, bandoBarcos, socketId);
    console.log(gamePLay);
    console.log(socketId);
    //emito datos al frontend
    console.log('termine de crear la partida y emiti al frontend');
  });

});





// io.broadcast.emit('currentPlayers', players)
// io.broadcast.emit('newPlayer', players[socket.id])

// io.on('disconnect', function () {
//   console.log('player [' + socket.id + '] disconnected')
//   delete players[socket.id]
//   io.broadcast.emit('playerDisconnected', socket.id)
// })





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
// app.use(require('./routes/index'));

//LISTEN
httpServer.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
  
});


