// Fetch user information and log result after promise resolution
// You can find documentation for the REST API here: https://api.sipgate.com/v2/doc
// the following methods are available:
// sipgate.getRest(path, filter)
// sipgate.postRest(path, filter, params)
// sipgate.putRest(path, filter, params)

await sipgate.getRest('blacklist/incoming');