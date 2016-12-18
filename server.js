'use strict';

const express = require('express');
const bodyParser = require('body-parser');

var httpServer = express();
var httpPort = 0;

httpServer.use(bodyParser.json());
httpServer.use(bodyParser.urlencoded({ extended: true }));

httpServer.post('/', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

httpPort = 80;
httpServer.listen(httpPort);
console.log('HTTP Listening at ' + httpPort)
