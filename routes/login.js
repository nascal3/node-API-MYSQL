const express = require('express');
const bcrypt = require('bcrypt');
const generateToken = require('../models/usersTokenGen');
const {Connection} = require('../startup/db');
const router = express.Router();

// DO THE LOGIN PROCESS
router.post('/', async(req, res) => {

  const params = [ req.body.username];
  await Connection.query('SELECT id, first_name, email, password, role FROM users WHERE email = ?', params, (error, results, fields) => {
    if (error) return res.status(400).send(error);
    if (results.length <= 0) return res.status(400).send('Invalid email or password');

    auth(results);

  });

  // AUTHENTICATE PASSWORDS AND GENERATE TOKEN
  const auth = async (results) => {
    const validPassword = await bcrypt.compare(req.body.password, results[0].password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    let id = results[0].id;
    let first_name = results[0].first_name;
    let role = results[0].role;
    let email = results[0].email;
    const token = generateToken(id, first_name, role, email);
    const userToken = {
      userToken: token
    };

    return res.header('x-auth-token', token).status(200).send(userToken);
  };
});

module.exports = router;