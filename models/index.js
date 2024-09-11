const config = require('../config/config.json');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'node_project',
  password : '12341234'
})

module.exports = connection;


