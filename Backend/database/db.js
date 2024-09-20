const { Pool } = require('pg');
require('dotenv').config();
const { broadcast } = require('../websocketServer');

// This Node.js module establishes a connection to a PostgreSQL database using the `pg` library, sets up a listener for notifications on the `data_update` channel, and broadcasts any received notifications through a WebSocket server, sending updates to all connected clients while ensuring proper client management.


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('An error occurred while acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL, Successfully');

  client.query('LISTEN data_update');

  client.on('notification', (msg) => {
    const payload = JSON.parse(msg.payload);
    console.log('Received notification:', payload);

    broadcast(JSON.stringify({ type: 'UPDATE_RECORD', payload }));
  });

  release();
});

module.exports = pool;
