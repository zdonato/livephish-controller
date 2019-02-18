let express = require('express');
let app = express();
let SSE = require('express-sse');
let sse = new SSE([]);
let http = require('http');
let bodyParser = require('body-parser');

const CURRENT_SONG = "";

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public/'});
});

app.get('/livephish-controller', sse.init);

app.get('/current-song', (req, res) => {
    res.send(CURRENT_SONG);
});

app.post('/current-song', bodyParser.json(), (req, res) => {
    CURRENT_SONG = req.body.song;
    res.send(CURRENT_SONG);
});

app.post('/controller', bodyParser.json(), (req, res) => {

    sse.send({
        control: req.body.control
    });

    res.send();
});

let server = http.createServer(app);
server.listen(9000);