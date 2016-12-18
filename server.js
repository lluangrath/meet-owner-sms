'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

var httpServer = express();
var httpPort = process.env.PORT || 8080;

httpServer.use(bodyParser.json());
httpServer.use(bodyParser.urlencoded({ extended: true }));

httpServer.get('/', function(req, res){
    console.log('GET /')
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

httpServer.post('/service', function(req, res){
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end('{"response":"success"}');
});

httpServer.listen(httpPort, function () {
  console.log("App now running on port", httpPort);
});
