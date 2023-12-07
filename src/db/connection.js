const mysql = require('mysql2/promise');

const mysqlConfig = {
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  port: process.env.MYSQL_PORT || 3306,
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'TalkerDB',
};

const connection = mysql.createPool(mysqlConfig);

module.exports = connection;
