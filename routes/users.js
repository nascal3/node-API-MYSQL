const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const generateToken = require('../models/usersTokenGen');
const User = require('../models/users');
require('express-async-errors');
const router = express.Router();

// GET users listing
router.get('/', auth, async (req, res) => {

  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] }
  });
  res.send(allUsers);
});

// REGISTER NEW USERS
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
  let count = await User.findAll({
    where: {
      email: data.email
    }
  });

  if (count.length >= 1) return res.status(400).send('the following user already exists');

  // SALT THE PASSWORD AND INSERT NEW USER INTO DB
  const salt = await bcrypt.genSalt(10);
  const salted_password = await bcrypt.hash(data.password, salt);

  let newData = {...data};
  newData.password = salted_password;

  // INSERT NEW USER INTO DATABASE
  let result = await User.create(newData);

  let id  = result.dataValues.id;
  const token = generateToken(id, data.first_name, data.role, data.email);

  return res.header('x-auth-token', token).status(200).send(result.dataValues);
});

module.exports = router;
