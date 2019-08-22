
const express = require('express');
const config = require('./config');
const sipgate = require('../../lib/sipgate')();

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  const tokenInfo = req.user.tokens[0];

  sipgate.getHistory(tokenInfo, { limit: 100 }).then((events) => {
    res.render(`apps/${config.path}/view`, {
      title: config.name,
      events
    });
  });
});

module.exports = router;
