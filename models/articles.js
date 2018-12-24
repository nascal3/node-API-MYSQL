const Sequelize = require('sequelize');
const sequelize = require('../startup/db');
const UserModel = require('./users');

const article = sequelize.define('article', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: UserModel.id
    }
  },
  title: Sequelize.TEXT,
  article_content: Sequelize.TEXT,
  publish: {
    type:   Sequelize.ENUM,
    allowNull: false,
    values: ['true', 'false'],
    defaultValue: 'true'
  },
  deleted: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['true', 'false'],
    defaultValue: 'true'
  }
});

module.exports = article;
