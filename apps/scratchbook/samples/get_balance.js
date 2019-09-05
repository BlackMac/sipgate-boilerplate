// Fetch the balance and log result after promise resolution
sipgate.getBalance().then((result) => {
  console.log(result);
// there is no automatic error handling, so you need to catch errors
}).catch(console.log);

// click „▶ run“ to fetch your accounts live balance