const axios = require('axios');
const querystring = require('querystring');

module.exports = () => {
  // TODO: Add caching algorithm
  const apiUrl = path => `https://api.sipgate.com/v2/${path}`;

  const fetch = (tokens, path, filter, params = {}) => new Promise((resolve, reject) => {
    const authStr = `Bearer ${tokens.accessToken}`;
    const query = querystring.encode(params);
    axios.get(apiUrl(`${path}?${query}`), { headers: { Authorization: authStr } }).then((res, err) => {
      if (err) {
        reject(err);
      }
      if (filter) {
        return resolve(filter(res.data));
      }
      return resolve(res.data);
    }).catch(err => reject(err));
  });

  const post = (tokens, path, filter, params = {}) => new Promise((resolve, reject) => {
    const authStr = `Bearer ${tokens.accessToken}`;
    console.log(apiUrl(path), params);
    axios.post(apiUrl(path), params, { headers: { Authorization: authStr } }).then((res, err) => {
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
  module.app = {};
  module.sessions = {};

  module.user.getInfo = (tokens, userid) => fetch(tokens, `users/${userid}`);

  module.auth.getUserInfo = tokens => fetch(tokens, 'authorization/userinfo');

  module.blacklist.getIncoming = tokens => fetch(tokens, 'blacklist/incoming', data => data.items);

  module.app.getEvents = tokens => fetch(tokens, 'authorization/userinfo');

  module.getSmsExtensions = (tokens, userid) => fetch(tokens, `${userid}/sms`, data => data.items);
  module.getPhoneNumbers = tokens => fetch(tokens, 'numbers', data => data.items);
  module.getBalance = tokens => fetch(tokens, 'balance');
  module.getUsers = tokens => fetch(tokens, 'users', data => data.items);
  module.getAddresses = tokens => fetch(tokens, 'addresses', data => data.items);
  module.getGroups = tokens => fetch(tokens, 'groups', data => data.items);
  module.getHistory = (tokens, params) => fetch(tokens, 'history', data => data.items, params);

  module.sessions.sendSms = (tokens, recipient, message) => new Promise((resolve, reject) => {
    module.auth.getUserInfo(tokens).then((info) => {
      module.getSmsExtensions(tokens, info.sub).then((extensions) => {
        post(tokens, 'sessions/sms', data => data, { recipient, message, smsId: extensions[0].id }).then((result) => {
          console.log(result);
          resolve(result);
        });
      });
    });
  });

  return module;
};
