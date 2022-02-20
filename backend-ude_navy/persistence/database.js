import mysql from 'mysql';
import { promisify } from 'util';
import config from '../config.js';
const pool = mysql.createPool(config);

//export default Router;
const Pool = function Pool() {
  //CONNECTION
  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has to many connections.');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
      }
    }
    if (connection) {
      connection.release();
      console.log('Database is Connected.');
    }
    return;
  });

  //POOL
  pool.query = promisify(pool.query);
}

export default Pool;
