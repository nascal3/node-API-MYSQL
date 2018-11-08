const express = require('express');
const users = require('../routes/users');
const login = require('../routes/login');
const articles = require('../routes/articles');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/articles', articles);
  app.use('/api/login', login);
};