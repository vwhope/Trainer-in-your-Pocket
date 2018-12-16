const express = require("express");

const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

// Load User model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Test get route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    message: "Test Passed"
  })
);

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar,
      dob: req.body.dob,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      diabetic: req.body.diabetic
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route POST api/users/login
// @desc Login user
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        email: "User not found"
      });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched, create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        return res.status(400).json({
          password: "Password incorrect"
        });
      }
    });
  });
});

// @route Get api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
