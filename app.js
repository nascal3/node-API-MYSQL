const express = require('express');
const app = express();

// CALL TO DB CONNECTION FOLDER
require('./startup/db');

// CALL TO ROUTES FOLDER
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
const server = app.listen( port, console.log(`listening to port ${port}`));

module.exports = server;
