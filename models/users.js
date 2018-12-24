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
  role: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['user', 'editor', 'admin'],
    defaultValue: 'user'
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = User;
