const express = require('express');
const router = express.Router();

// @route GET api/users/test
// @desc Test get route
// @access Public
router.get('/test', (req, res) => 
  res.json({message: 'Test Passed'})
);

module.exports = router;
