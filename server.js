'use strict';

const express = require('express');
const bodyParser = require('body-parser');

var httpServer = express();
var httpPort = process.env.PORT || 8080;

httpServer.use(bodyParser.json());
httpServer.use(bodyParser.urlencoded({ extended: true }));

httpServer.post('/service', function(req, res){
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end('{"response":"success"}');
});

httpServer.listen(httpPort, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
