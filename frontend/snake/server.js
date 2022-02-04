
//Example usage in the command prompt
//node Server.js

// Parameters
const port = 880; //Specify a port for our web server
const express = require('express'); //load express with the use of requireJs

const app = express(); //Create an instance of the express library

app.use(express.static(__dirname + '/'));//Serving static files
app.listen(port, function() { //Listener for specified port
    console.log("Server running at: http://localhost:" + port)
});

/*

const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = path.join(__dirname, '/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

});

*/

