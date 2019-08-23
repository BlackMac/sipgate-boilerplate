// A quick and dirty phone number geolocation library for germany
const nta = require("numbertoarea");

// Get history filtered by event type CALL
const calls = await sipgate.getHistory({
    types:"CALL",
    limit:100
});

let locations = [];

calls.forEach(call => {
    const number = (call.incoming ? call.source:call.target);

    let location = nta.getLocation(number);
    if (location) locations.push(location)
});
console.log(locations)