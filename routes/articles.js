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

// GET ARTICLES FOR ONLY FOR THE LOGGED USER
router.get('/me', auth, async (req, res) => {

   const articles = await Article.findAll({
    where: {
      user_id: req.user.id
    }
  });

  let data = [];
  articles.forEach(article => {
    data.push({...article.dataValues, authorName: req.user.name});
  });

  res.status(200).send(data);
});

module.exports = router;
