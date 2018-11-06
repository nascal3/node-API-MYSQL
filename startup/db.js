const mysql = require('mysql');
const config = require('config');

const options = {
  user: config.get('user'),
  password: config.get('password'),
  database: config.get('database')
};

const connection = mysql.createConnection(options);

connection.connect((err) => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;
  }
});

console.log('DB connected successfully');

module.exports.Connection = connection;