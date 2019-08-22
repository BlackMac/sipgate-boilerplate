// Require the sipgate library
const sipgate = require("sipgate-bp-lib")();

sipgate.getHistory({types:"CALL"}).then((result) => {
  console.log(result);

}).catch(console.log);