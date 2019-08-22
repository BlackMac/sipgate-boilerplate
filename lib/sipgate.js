const axios = require('axios');

module.exports = () => {
  // TODO: Add caching algorithm
  const apiUrl = path => `https://api.sipgate.com/v2/${path}`;

  const fetch = (tokens, path, filter) => new Promise((resolve, reject) => {
    const authStr = `Bearer ${tokens.accessToken}`;
    axios.get(apiUrl(path), { headers: { Authorization: authStr } }).then((res, err) => {
      if (err) {
        reject(err);
      }
      if (filter) {
        return resolve(filter(res.data));
      }
      return resolve(res.data);
    }).catch(err => reject(err));
  });

  module.auth = {};
  module.user = {};
  module.blacklist = {};

  module.user.getInfo = (tokens, userid) => fetch(tokens, `users/${userid}`);

  module.auth.getUserInfo = tokens => fetch(tokens, 'authorization/userinfo');

  module.blacklist.getIncoming = tokens => fetch(tokens, 'blacklist/incoming', data => data.items);


  module.getPhoneNumbers = tokens => fetch(tokens, 'numbers', data => data.items);
  module.getBalance = tokens => fetch(tokens, 'balance');
  module.getUsers = tokens => fetch(tokens, 'users', data => data.items);
  module.getAddresses = tokens => fetch(tokens, 'addresses', data => data.items);
  module.getGroups = tokens => fetch(tokens, 'groups', data => data.items);
  return module;
};
