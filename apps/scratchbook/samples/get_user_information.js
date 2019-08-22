// Require the sipgate library
const sipgate = require("sipgate-bp-lib")();

// Fetch user information and log result after promise resolution
sipgate.auth.getUserInfo().then((result) => {
  console.log(result);

}).catch(console.log);