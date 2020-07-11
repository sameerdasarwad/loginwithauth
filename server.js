const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const passport = require('passport');
const users = require('./routes/api/users');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express(); // Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json()); // DB Config

// Passport middleware
app.use(passport.initialize()); // Passport config

require('./config/passport')(passport); // Routes

app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running port ${PORT}`));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error :${err.message}`);
  server.close(() => process.exit(1));
});
