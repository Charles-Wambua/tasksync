const { Pool } = require('pg');
require('dotenv').config();
const { broadcast } = require('../websocketServer');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client) => {
  if (err) {
    console.error('An error occurred while acquiring client', err.stack);
    return;
  }
  console.log('Connected to PostgreSQL, Successfully');

  client.query('LISTEN data_update');

  client.on('notification', (msg) => {
    try {
      const payload = JSON.parse(msg.payload);
      console.log('Received notification:', payload);
      broadcast(JSON.stringify(payload)); 
    } catch (error) {
      console.error('Error processing notification payload:', error);
    }
  });
  
});

module.exports = pool;
