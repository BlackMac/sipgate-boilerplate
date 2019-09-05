
const express = require('express');
const config = require('./config');
const sipgate = require('../../lib/sipgate')();

const router = express.Router();

// define the home page route
router.get('/', (req, res) => {
  const tokenInfo = req.user.tokens[0];
  Promise.all([
    sipgate.settings.getSipgateIo(tokenInfo),
    sipgate.getPhoneNumbers(tokenInfo)
  ]).then(([info, numbers]) => {
    let activeNumber = '';
    numbers.forEach((number) => {
      if (number.endpointId) {
        activeNumber = number.localized;
      }
    });
    let canchange = 'n';
    if ((info.incomingUrl.match(/https:\/\/[a-z0-9]+\.runkit\.sh/) !== null
    && info.outgoingUrl.match(/https:\/\/[a-z0-9]+\.runkit\.sh/) !== null) || (
      info.incomingUrl === '' && info.outgoingUrl === '')) {
      canchange = 'y';
    }
    res.render(`apps/${config.path}/view`, {
      activeNumber,
      canchange,
      title: config.name,
      accessToken: tokenInfo.accessToken
    });
  });
});

router.post('/webhook', (req, res) => {
  if (req.body.URL || req.body.URL === '') {
    const tokenInfo = req.user.tokens[0];
    sipgate.settings.setSipgateIoUrls(tokenInfo, req.body.URL);
    res.send('OK');
  }
});

module.exports = router;
