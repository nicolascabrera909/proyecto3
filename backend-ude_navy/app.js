//var Armamento from './services/Armament.js';
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config');





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
app.listen(port, () => {
  console.log(`Express Server is running on port ${port}`);
})



//prueba
// let arma=new Armamento(10,15);

 //console.log('armamento'+ arma);
 //console.log("poder"+ arma.power);
 //arma.power=200;
 //console.log("poder"+arma.power);*/