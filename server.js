'use strict';

const express = require('express');
const bodyParser = require('body-parser');

var httpServer = express();

httpServer.use(bodyParser.json());
httpServer.use(bodyParser.urlencoded({ extended: true }));

httpServer.post('/service', function(req, res){
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end('{"response":"success"}');
});

httpServer.listen(httpPort);
httpServer.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
console.log('HTTP Listening at ' + httpPort)
