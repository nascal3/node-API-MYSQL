const express = require('express');
const connection = require('../startup/db');
const auth = require('../middleware/auth');
require('express-async-errors');
const router = express.Router();

// GET ALL ARTICLES
router.get('/', auth, async (req, res) => {

  await connection.query('SELECT * FROM articles', (error, results, field) => {
    if (error) return res.status(400).send(error);
    res.status(200).send(results);
  })

});

module.exports = router;