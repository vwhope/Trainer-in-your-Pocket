const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");

// Load Program Validation
const validateProgramInput = require("../../validation/program");

// Load Program model
const Program = require("../../models/Program");

// @route GET api/program/view
// @desc Gets all programs
// @access Private
router.get("/view", (req, res) => {
  Program.find({}).then(programs => {
    if (!programs) {
      return res.status(204).json({
        program: "No programs found"
      });
    }
    res.json(programs);
  });
});

// @route POST api/program/add
// @desc Adds a new program
// @access Private
router.post("/add", (req, res) => {
  // Validate program input
  const { errors, isValid } = validateProgramInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create new program object
  const newProgram = new Program({
    name: req.body.name,
    trainer: req.body.trainer,
    avatar: req.body.avatar,
    summary: req.body.summary,
    length: req.body.length
  });

  // Save new program into the database
  newProgram
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

module.exports = router;
