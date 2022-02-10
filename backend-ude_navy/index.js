const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { database } = require('./config.js');

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

let whitelist=['http://localhost','http://localhost:5500','http://localhost:5501','http://localhost:3000','http://127.0.0.1','http://127.0.0.1:5500','http://127.0.0.1:5501','http://127.0.0.1:3000'];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/version', async (req, res) => {
  const version = await pool.query('SELECT version FROM udenavybd.version');
  console.log(version);
  res.render(version);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
})