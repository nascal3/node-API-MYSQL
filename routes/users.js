const express = require('express');
const {Connection} = require('../startup/db');
require('express-async-errors');
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {

  await Connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) return res.send(error);
    res.send(results);
  })

});

module.exports = router;
