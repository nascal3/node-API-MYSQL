const jwt = require('jsonwebtoken');
const config = require('config');

const generateAuthToken = (id, first_name, role, email) => {
   return jwt.sign({id: id, first_name: first_name, role: role, email: email}, config.get('jwtPrivateKey') );
};

module.exports = generateAuthToken;