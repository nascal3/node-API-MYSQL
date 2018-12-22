const jwt = require('jsonwebtoken');
const config = require('config');

const generateAuthToken = (id, first_name, last_name, role, email) => {
   return jwt.sign({id: id, name: first_name +' '+ last_name, role: role, email: email}, config.get('jwtPrivateKey') );
};

module.exports = generateAuthToken;
