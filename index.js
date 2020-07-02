var app = require('express')();
var http = require('http').createServer(app);
var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
    httpServer: http,
    keepalive: false,
    autoAcceptConnections: false
});

app.get('/', (req, res) => {
    console.log('Received request for ' + req.url);
    res.sendStatus(200);
});

wsServer.on('error', function (e) {
    printError(e);
});


wsServer.on('request', function(request) {
    let connection = request.accept('', request.origin);

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function (message) {
        console.log('Received Message: ' + message.utf8Data);
    });

    connection.on('close', function (reasonCode, description) {
        console.log('close');
    });

    connection.on('pong', function () {
        console.log('pong')
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
