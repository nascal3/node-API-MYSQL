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

Connection.execute('select * from users').then((results) => {
  if (results) {
    console.log('DB connected successfully');
  }
}).catch(err => {
    console.error(`An error occurred while connecting to the DB: ${err} `);
});

module.exports = connection;