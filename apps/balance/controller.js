
const express = require('express');
const config = require('./config');
const sipgate = require('../../lib/sipgate')();

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  const tokenInfo = req.user.tokens[0];
  sipgate.getBalance(tokenInfo).then((balance) => {
    res.render(`apps/${config.path}/view`, {
      title: config.name,
      balance
    });
  });
});

module.exports = router;
