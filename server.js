require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const users = require('./routes/api/users');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

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
