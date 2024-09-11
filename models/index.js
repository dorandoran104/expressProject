const config = require('../config/config.json');
const mysql = require('mysql2');

const connection = mysql.createConnection(
  config.development
)

module.exports = connection;


