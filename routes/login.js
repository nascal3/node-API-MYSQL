const express = require('express');
const bcrypt = require('bcrypt');
const generateToken = require('../models/usersTokenGen');
const Connection = require('../startup/db');
const router = express.Router();

// DO THE LOGIN PROCESS
router.post('/', async(req, res) => {

  const params = [ req.body.username];
  const [rows, fields] = await Connection.execute('SELECT id, first_name, email, password, role FROM users WHERE email = ?', params);

  if (rows.length <= 0) {
    return res.status(400).send('Invalid email or password');
  } else {
    // AUTHENTICATE PASSWORDS AND GENERATE TOKEN
    const validPassword = await bcrypt.compare(req.body.password, rows[0].password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    let id = rows[0].id;
    let first_name = rows[0].first_name;
    let role = rows[0].role;
    let email = rows[0].email;
    const token = generateToken(id, first_name, role, email);
    const userToken = {
      userToken: token
    };

    return res.header('x-auth-token', token).status(200).send(userToken);
  }
});

module.exports = router;