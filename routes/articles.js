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
router.get('/all', auth, async (req, res) => {

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

// CREATE NEW ARTICLE
router.post('/new', auth, async (req, res) => {
  if (req.user.role === 'user') return res.status(403).send('permission denied for this operation!');

  const results = await Article.create({
    title: req.body.title,
    article_content: req.body.content
  });

  res.status(200).send(results);
});

// EDIT ARTICLE
router.post('/edit', auth, async (req, res) => {
  if (req.user.role === 'user') return res.status(403).send('permission denied for this operation!');

  const id = await Article.findOne({
    where: {
      id: req.body.id
    }
  });

  if (id == null ) return res.status(404).send('the following article doesnt exist or was moved!');

   const results = await Article.update(
      {
        title: req.body.title
      },
      {
        where: {
          user_id: req.user.id,
          id: req.body.id
        }
      }
   );

   res.status(200).send(results);
});

module.exports = router;
