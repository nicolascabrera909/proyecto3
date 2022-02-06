/**
 * Parametros Express
 */
const express = require('express');
const app = express();
const port = 3000;

/**
 * Parametros Socket.io
 */
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5500",
  }
});

/**
 * Request basico
 */
//app.get('/', (req, res) => {
//  res.send('Hola Mundo!');
//});

/**
 * Request retornando un archivo
 */
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

/**
 * Socket.io Mensaje en consola
 */
//io.on('connection', (socket) => {
//  console.log('a user connected');
//});

/**
 * Socket.io Mensaje en consola - Conectado y desconectado
 */
// io.on('connection', function (socket) {
//  console.log('A user connected: ' + socket.id);

//  socket.on('disconnect', function () {
//      console.log('A user disconnected: ' + socket.id);
//  });
// });

/**
 * Socket.io Chat
 */
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

/**
 * Respuesta 404
 */
app.use(function (req, res, next) {
  res.status(404).send("Lo siento. No podemos encontrar eso.");
});

/**
 * Respuesta 500
 */
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo no esta bien. Vuelva a intentar mas tarde. Gracias.');
});

/**
 * Levantar servidor
 */
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
