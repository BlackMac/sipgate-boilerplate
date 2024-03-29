var express = require("@runkit/runkit/express-endpoint/1.0.0");
var bodyParser = require('body-parser');

var app = express(exports);
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", (req, res) => {
    const data = req.body;
    res.type('application/xml')
    res.end(`<!--?xml version="1.0" encoding="UTF-8"?-->
<Response>
    <Play>
        <Url>https://storage.googleapis.com/clinq-static-files/english-phone-number.wav</Url>
    </Play>
    <Say>${data.from}</Say>
    <Play>
        <Url>https://storage.googleapis.com/clinq-static-files/thank-you.wav</Url>
    </Play>
</Response>`);
})