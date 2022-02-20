//importo las clases que necesito
import Games from './services/Games.js'
import cors from 'cors';
import { createServer } from "http";
import Router from './routes/index.js'
/*Declaro variables o constantes*/
// const express = require('express');
import express from 'express';
import Pool from './persistence/database.js'

const app = express();
const port = 3000;

//import { database } from './config.js';
//app.use('/', Router);
//app.use('/version', Router);
//app.use('/', Pool);

//variables del juego
const players = {};
let cantUsers = 0;
let listaGame = [];
 

/**SOCKET.IO configuracion**/
import http from 'http';
import { Server } from "socket.io";

// SERVER EXPRESS
const httpServer = createServer(app); 

// httpServer.on('request', (request, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!'
//   }));
// });


// SOCKET SERVER
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
  console.log("luego de la conexion");
  if (listaGame.length === 0) {
    console.log('Nueva partida');
  }

  socket.on('createGame', function (name, bandoBarcos, level) {
    console.log('player [' + socket.id + '] connected')
    //valido si la lita esta vacia
    console.log('New Game' + name + ' - ' + bandoBarcos + ' - ' + level);
    //creo una instacia de todos los juegos y agrego a la lista de juegos
    console.log('antes de new');
    const gamePLay = new Games(level);
    console.log('antes gamePLay.createGame');
    gamePLay.createGame(name, bandoBarcos, socket.id);
    console.log(gamePLay);
    console.log(socket.id);
    //emito datos al frontend
    console.log('emito los datos al front');
    console.log(gamePLay[0]);
    io.emit('losJuegos', gamePLay[0]);
    console.log('termine de crear la partida y emiti al frontend');
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
const root = Router.root;
app.get('/', () => root);
//var router = express.Router(); 
//app.get('/', router);

//app.get('/', (req, res) => {
//  res.send(Router);
//})

//LISTEN
httpServer.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto: ${port}`);
  
});


