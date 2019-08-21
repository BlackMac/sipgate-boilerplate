const path = require('path');

module.exports = {
  name: `App in ${path.basename(__dirname)}`, // replace with your applications human readable name
  path: path.basename(__dirname),
  controller: 'controller.js',
  symbol: 'fas fa-circle' // use classes for Fontawesome fonts here ( https://fontawesome.com/icons?d=gallery&m=free )
};
