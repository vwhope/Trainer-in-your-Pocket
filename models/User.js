const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String, 
    required: true 
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  dob: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: Number, 
    required: true,
  },
  height: {
    type: Number,
    required: true
  },
  diabetic: {
    type: Boolean,
    required: true,
  }
});

module.exports = User = mongoose.model('users', UserSchema);
