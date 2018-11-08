const express = require('express');
const bcrypt = require('bcrypt');
const generateToken = require('../models/usersTokenGen');
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

router.post('/', async (req, res) => {

  let role = "user";
  if (req.body.role) {
    role = req.body.role
  }

  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    role: role,
    password: req.body.password,
    email: req.body.email
  };

  // CHECK IF USERNAME / EMAIL ALREADY EXISTS
  await Connection.query('SELECT COUNT(email) as email_count FROM users WHERE email = ?', [data.email], (error, results, fields) => {
    if (error) return res.status(400).send(error);

   if (results[0].email_count >= 1) return res.status(400).send('the following user already exists');

   salt_password();

  });

  // SALT THE PASSWORD AND INSERT NEW USER INTO DB
  let salt_password = async () => {
    const salt = await bcrypt.genSalt(10);
    const salted_password = await bcrypt.hash(data.password, salt);

    let newData = {...data};
    newData.password = salted_password;

    // INSERT NEW USER INTO DATABASE
    await Connection.query('INSERT INTO users SET ?', newData, (error, results, fields) => {
      if (error) return res.status(400).send(error);

      let id  = results.insertId;

      const token = generateToken(id, data.first_name, data.role, data.email);
      results = {...results, userToken: token};

      return res.header('x-auth-token', token).status(200).send(results);

    })
  };
});

module.exports = router;
