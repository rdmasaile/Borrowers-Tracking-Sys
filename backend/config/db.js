require('dotenv').config();
var mysql = require('mysql2');

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: ""
});

module.exports = pool.promise();
