
import Games from '../services/Games.js';
import express from 'express';
import { } from '../persistence/database';

// export const function Router {

const router = express.Router();
let gameList = [];

// export default Router;
const Router = function Router() {
    router.get('/', (req, res) => {
        res.send('Bienvenidos a UDE Navy');
    });

    router.get('/version', async (req, res) => {
        const version = await pool.query('SELECT version FROM udenavybd.version');
        if (version.length > 0)
            res.send(version[0].version);
        else
            res.send('0');
    });
}

export default Router;