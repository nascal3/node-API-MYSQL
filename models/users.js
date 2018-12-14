const Sequelize = require('sequelize');
const sequelize = require('../startup/db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  role: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.TEXT
});

module.exports = User;
