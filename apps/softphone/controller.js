
const express = require('express');
const config = require('./config');
const sipgate = require('../../lib/sipgate')();

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  const tokenInfo = req.user.tokens[0];

  sipgate.getCredentials(tokenInfo).then((credentials) => {
    credentials.items.forEach((extension) => {
      if (extension.type === "REGISTER") {
        console.log(extension.credentials);
        return res.render(`apps/${config.path}/view`, {
          title: config.name,
          extension: JSON.stringify({
            uri: `sip:${extension.credentials.username}@${extension.credentials.sipServer}`,
            wsServers: extension.credentials.sipServerWebsocketUrl,
            authorizationUser: extension.credentials.username,
            password: extension.credentials.password
          })
        });
      }
    });
  });
});

module.exports = router;
