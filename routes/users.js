const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const generateToken = require('../models/usersTokenGen');
const Connection = require('../startup/db');
require('express-async-errors');
const router = express.Router();

/* GET users listing. */
router.get('/', auth, async (req, res) => {

  const [rows, field] = await Connection.execute('SELECT * FROM users');
  res.send(rows);
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
  const [rows, fields] = await Connection.execute('SELECT COUNT(email) as email_count FROM users WHERE email = ?', [data.email]);
  if (rows[0].email_count >= 1) return res.status(400).send('the following user already exists');

  // SALT THE PASSWORD AND INSERT NEW USER INTO DB
  const salt = await bcrypt.genSalt(10);
  const salted_password = await bcrypt.hash(data.password, salt);

  let newData = {...data};
  newData.password = salted_password;

  // INSERT NEW USER INTO DATABASE
  const [row, feilds] = await Connection.query('INSERT INTO users SET ?', newData);

  let id  = row.insertId;
  const token = generateToken(id, data.first_name, data.role, data.email);
  let userData = {...row, userToken: token};

  return res.header('x-auth-token', token).status(200).send(userData);

});

module.exports = router;
