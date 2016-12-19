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

    var emlBdy = 'Hello, a prospective owner wants to ask you a question. Please see below:<br/><br/>"'+req.body.Body+'"<br/><br/>Please reply within 1-3 days. Thanks!';
    sendOwnerEmail(res,"larry.luangrath@clynch.com","[Subaru] Meet an Owner",req.body.Body,"Prospective Owner");
    
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end('<Response><Message>Message Recieved. Please allow up to 1-3 days for the Subaru Owner to reply. Thanks!</Message></Response>');
});

httpServer.get('/sendOwnerEmail',function(req, res){
  sendOwnerEmail(res,"larry.luangrath@clynch.com","Test Email","You are testing this email.","test");
});

httpServer.listen(httpPort, function () {
  console.log("App now running on port", httpPort);
});

function sendOwnerEmail(res,toEml,sbj,bdy,tag){
    //NOTE: below was removed to use email template from PostMark
    //"Subject": sbj,
    //"HtmlBody": bdy,
  postmark.sendEmailWithTemplate({
    "From": "larry.luangrath@clynch.com",
    "To": toEml,
    "ReplyTo":"reply@meetanowner.com",
    "Tag": tag,
    "TemplateId": 1163523,
    "TemplateModel": {
      "owner_name": "Subaru owner",
      "action_url": "http://www.subaru.com",
      "prospective_msg": bdy
    }
  }, function(error, success) {
      res.writeHead(error?500:200, {'Content-Type': 'text/xml'});

      if(error) {
          console.error("Unable to send via postmark: " + error.message);
          res.end('<Response><Message>Error Sending Email</Message></Response>');
      }
      else {
        console.info("Sent to postmark for delivery");
        res.end('<Response><Message>Email sent</Message></Response>');
      }
  });
}

function sendProspectSMS(){

}
