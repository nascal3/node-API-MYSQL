const config = require('config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.get('database'),
    config.get('user'),
    config.get('password'),
    {dialect: 'mysql', host: 'localhost', operatorsAliases: false}
);

module.exports = sequelize;
