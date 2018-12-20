const express = require('express');
const Article = require('../models/articles');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
require('express-async-errors');
const router = express.Router();

// GET ALL ARTICLES
router.get('/', [auth, admin], async (req, res) => {

  const article = await Article.findAll();
  res.send(article);
});

module.exports = router;
