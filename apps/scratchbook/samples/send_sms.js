// Require the sipgate library
const sipgate = require("sipgate-bp-lib")();

// Make sure to replace the phone number with a real one
sipgate.sessions.sendSms("+4912345678", "This is a message!").then((result) => {
  console.log('Message Sent');

}).catch(console.log);