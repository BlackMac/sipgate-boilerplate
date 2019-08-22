// Get history filtered by event type CALL
await sipgate.getHistory({
    types:"CALL",
    limit:20
});