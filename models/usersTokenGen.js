const jwt = require('jsonwebtoken');
const config = require('config');

const generateAuthToken = (id, first_name, email) => {
   return jwt.sign({id: id, first_name: first_name, email: email}, config.get('jwtPrivateKey') );
};

module.exports = generateAuthToken;