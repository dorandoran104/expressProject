const mysql = require('mysql2');
const dotenv = require("dotenv").config();
var mybatisMapper = require('mybatis-mapper')

mybatisMapper.createMapper([
  './mapper/categoryMapper.xml'
  ,'./mapper/goodsMapper.xml'
  ,'./mapper/fileMapper.xml'
])
const format = { language: 'sql', indent: '  ' };

const db = mysql.createConnection({
  
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password : process.env.DB_PASSWORD,
  multipleStatements: true
})

module.exports = {db,mybatisMapper,format}