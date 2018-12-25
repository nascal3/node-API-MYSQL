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

// GET SINGLE ARTICLE
const singleArticle = async (id) => {
  const result = await Article.findOne({
    where: {
      id: id
    }
  });

  if (result == null ) return false;
  return result;
};

// GET ALL ARTICLES FOR ONLY THE LOGGED USER
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

  const selectedArticle = await singleArticle(req.body.id);
  if (selectedArticle === false) return res.status(400).send('The following article does not exist or was moved!');

  const results = await Article.update(
      {
        title: req.body.title,
        article_content: req.body.content
      },
      {
        where: {
          user_id: req.user.id,
          id: req.body.id
        }
      }
   );

  if (results[0] !== 1 ) return res.status(500).send('Oops seems like something went wrong!');
  const editedArticle = await singleArticle(req.body.id);
  res.status(200).send(editedArticle.dataValues);
});

module.exports = router;
