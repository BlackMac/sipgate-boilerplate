const sipgate = require('../lib/sipgate')();

/**
 * GET /contact
 * Contact form page.
 */
exports.getOverview = (req, res) => {
  const unknownUser = !(req.user);
  const tokenInfo = req.user.tokens[0];
  // const authStr = `Bearer ${tokenInfo.accessToken}`;
  Promise.all([
    sipgate.getBalance(tokenInfo),
    sipgate.getPhoneNumbers(tokenInfo),
    sipgate.blacklist.getIncoming(tokenInfo),
    sipgate.getUsers(tokenInfo),
    sipgate.getAddresses(tokenInfo),
    sipgate.getGroups(tokenInfo)
  ]).then(([balance, phoneNumbers, blacklist, users, addresses, groups]) => {
    let unverifiedCount = 0;
    addresses.forEach((address) => {
      if (address.type !== 'VERIFIED') unverifiedCount++;
    });
    res.render('overview', {
      title: 'Account Overview',
      unknownUser,
      phoneNumbers,
      blacklist,
      unverifiedCount,
      addresses,
      balance,
      users,
      groups,
      intl: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
    });
  }).catch((error) => {
    res.render('error', {
      error
    });
  });
};
