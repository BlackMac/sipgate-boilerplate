// Fetch user information and log result after promise resolution
// You can find documentation for the REST API here: https://api.sipgate.com/v2/doc
// the following methods are available:
// sipgate.getRest(path, filter)
// sipgate.postRest(path, filter, params)
// sipgate.putRest(path, filter, params)
const { ValueViewerSymbol } = require("@runkit/value-viewer");

return await sipgate.getRest('blacklist/incoming').then(res => {
    const BlacklistCount = {}
    BlacklistCount[ValueViewerSymbol]= {
            title:"Blacklist Count",
            HTML: `<h1>Blacklisted Numbers: ${res.items.length}</H1>`
        };
    return BlacklistCount;
});