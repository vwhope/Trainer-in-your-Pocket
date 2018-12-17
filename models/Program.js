const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  trainer: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  summary: {
    type: String,
    required: true
  },
  length: {
    type: Number
  }
});

module.exports = User = mongoose.model("program", ProgramSchema);
