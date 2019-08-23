const axios = require('axios');
const querystring = require('querystring');

module.exports = () => {
  // TODO: Add caching algorithm
  const apiUrl = path => `https://api.sipgate.com/v2/${path}`;

  const apiGet = (tokens, path, filter, params = {}) => new Promise((resolve, reject) => {
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

  const apiPost = (tokens, path, filter, params = {}) => new Promise((resolve, reject) => {
    const authStr = `Bearer ${tokens.accessToken}`;
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

  const apiPut = (tokens, path, filter, params = {}) => new Promise((resolve, reject) => {
    const authStr = `Bearer ${tokens.accessToken}`;
    axios.put(apiUrl(path), params, { headers: { Authorization: authStr } }).then((res, err) => {
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

  module.user.getInfo = (tokens, userid) => apiGet(tokens, `users/${userid}`);

  module.auth.getUserInfo = tokens => apiGet(tokens, 'authorization/userinfo');

  module.blacklist.getIncoming = tokens => apiGet(tokens, 'blacklist/incoming', data => data.items);

  module.app.getEvents = tokens => apiGet(tokens, 'authorization/userinfo');

  module.getSmsExtensions = (tokens, userid) => apiGet(tokens, `${userid}/sms`, data => data.items);
  module.getPhoneNumbers = tokens => apiGet(tokens, 'numbers', data => data.items);
  module.getBalance = tokens => apiGet(tokens, 'balance');
  module.getUsers = tokens => apiGet(tokens, 'users', data => data.items);
  module.getAddresses = tokens => apiGet(tokens, 'addresses', data => data.items);
  module.getGroups = tokens => apiGet(tokens, 'groups', data => data.items);
  module.getHistory = (tokens, params) => apiGet(tokens, 'history', data => data.items, params);

  module.updateDeviceAlias = (tokens, deviceId, alias) => apiPut(tokens, process.env.TOKEN, `devices/${deviceId}/alias`, { value: alias });

  module.sessions.sendSms = (tokens, recipient, message) => new Promise((resolve, reject) => {
    module.auth.getUserInfo(tokens).then((info) => {
      module.getSmsExtensions(tokens, info.sub).then((extensions) => {
        apiPost(tokens, 'sessions/sms', data => data, { recipient, message, smsId: extensions[0].id }).then((result) => {
          resolve(result);
        });
      });
    });
  });

  return module;
};
