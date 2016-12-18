'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const WebSocket = require('ws');
const postmark = require("postmark")(process.env.POSTMARK_API_TOKEN);

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

    var HOST = 'wss://meet-owner-ws.herokuapp.com'
    var ws = new WebSocket(HOST);
    ws.on('open', function open() {
      console.log('connected');
      ws.send(JSON.stringify(req.body));
    });
    
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end('<Response><Message>SMS received by Server</Message></Response>');
});

httpServer.get('/sendOwnerEmail',function(req, res){
  postmark.send({
    "From": "meet-owner-sms@mao.com",
    "To": "larry.luangrath@clynch.com",
    "Subject": "Hello from Postmark",
    "TextBody": "Hello! A SMS Text has been sent",
    "Tag": "big-bang"
  }, function(error, success) {
      if(error) {
          console.error("Unable to send via postmark: " + error.message);
          res.writeHead(500, {'Content-Type': 'text/xml'});
          res.end('<Response><Message>Error Sending Email</Message></Response>');
        return;
      }
      console.info("Sent to postmark for delivery");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end('<Response><Message>Email sent</Message></Response>');
  });

});


httpServer.listen(httpPort, function () {
  console.log("App now running on port", httpPort);
});
