const express = require('express');
const bcrypt = require('bcrypt');
const generateToken = require('../models/usersTokenGen');
const User = require('../models/users');
const router = express.Router();

// DO THE LOGIN PROCESS
router.post('/', async(req, res) => {

  let results = await User.findOne({
    where: {
      email: req.body.username
    }
  });

  if ( results == null) {
    return res.status(400).send('Invalid email or password');
  } else {
    // AUTHENTICATE PASSWORDS AND GENERATE TOKEN
    const validPassword = await bcrypt.compare(req.body.password, results.dataValues.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    let id = results.dataValues.id;
    let first_name = results.dataValues.first_name;
    let role = results.dataValues.role;
    let email = results.dataValues.email;
    const token = generateToken(id, first_name, role, email);
    const userToken = {
      userToken: token
    };

    return res.header('x-auth-token', token).status(200).send(userToken);
  }
});

module.exports = router;
