let notebook = RunKit.createNotebook({
  element: document.getElementById('io-editor'),
  source: `const sipgate = require("sipgate-bp-lib")();

sipgate.sessions.sendSms("+4912345678", "This is a short message!").then((result) => {
  console.log(result);
}).catch(error => {
  console.log("Error", error);
});`,
  env: [`TOKEN=${accessToken}`]
});
