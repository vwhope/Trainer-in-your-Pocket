require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require('./routes/api/users');
const passport = require('passport');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Setup Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch( err => console.log('Error connecting to DB: ' + err));

// Use Routes
app.use('/api/users', users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
  console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
);
