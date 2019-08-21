
const express = require('express');
const config = require('./config');

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  res.render(`apps/${config.path}/view`, {
    title: config.name
  });
});

module.exports = router;
