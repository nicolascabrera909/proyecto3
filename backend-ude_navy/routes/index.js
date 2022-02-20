
import Games from '../services/Games.js';
import express from 'express';
import pool from '../persistence/database.js';
// export const function Router {

const router = express.Router();
let gameList = [];
  

// class Routes {
//     constructor(){
//         this.foo = 10
//     }

//     Root = (req, res, next) => {
//         res.json({foo: this.foo});
//     }
// }

// var routes = new Routes();
// app.get('/', routes.Root);


// export default Router;
class Router {
    
    constructor(){
    }
    
    root = (req, res, next) => {
        res.writeHead(200);
        console.log('Bienvenidos a UDE Navy');
        res.send('Bienvenidos a UDE Navy');
    };

    version = ( async (req, res) => {
        const version = await pool.query('SELECT version FROM udenavybd.version');
        if (version.length > 0)
            res.send(version[0].version);
        else
            res.send('0');
    });
}

export default Router;