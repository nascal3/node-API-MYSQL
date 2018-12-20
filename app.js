const express = require('express');
const app = express();

// CALL TO DB CONNECTION FOLDER
const sequelize = require('./startup/db');
const model = require('./models/articles');

// CALL TO ROUTES FOLDER
require('./startup/routes')(app);

// CREATE TABLES IF THEY DON'T EXIST
sequelize.sync().then(result => {
  const port = process.env.PORT || 3000;
  app.listen( port, console.log(`listening to port ${port}`));
}).catch( err => {
  console.log(err);
});


