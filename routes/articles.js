const express = require('express');
const Connection = require('../startup/db');
const auth = require('../middleware/auth');
require('express-async-errors');
const router = express.Router();

// GET ALL ARTICLES
router.get('/', auth, async (req, res) => {

  const [rows, fields] = await Connection.execute('SELECT * FROM articles');
  res.status(200).send(rows);
});

module.exports = router;
