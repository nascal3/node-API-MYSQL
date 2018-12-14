const mysql = require('mysql2');
const config = require('config');

const options = {
  host: 'localhost',
  user: config.get('user'),
  password: config.get('password'),
  database: config.get('database')
};

const connection = mysql.createPool(options);

const Connection = connection.promise();

module.exports = Connection;