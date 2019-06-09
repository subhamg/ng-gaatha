// const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const items = require('./routes/items');
// const customers = require('./routes/customers');
// const movies = require('./routes/movies');
// const rentals = require('./routes/rentals');
const users = require('./routes/users');
// const auth = require('./routes/auth');
const express = require('express');
const cors = require('cors');
const app = express();

// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//   process.exit(1);
// }

mongoose
  .connect(
    'mongodb://localhost/gaatha',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));

app.use('/uploads/creatorfile', express.static('uploads/creatorfile'));
app.use(cors());
app.use(express.json());
app.use('/api/items', items);
app.use('/api/user', users);

module.exports = app;
