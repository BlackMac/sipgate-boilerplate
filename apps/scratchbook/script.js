let notebook = RunKit.createNotebook({
  element: document.getElementById('io-editor'),
  source: `const sipgate = require("sipgate-bp-lib")();

sipgate.sessions.sendSms("+4912345678", "Das ist eine SMS");`,
  env: [`TOKEN=${accessToken}`]
});
