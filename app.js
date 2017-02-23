var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();
var router = require('./router/main')(app);
var mysql = require('mysql');
var port = 3001;
//var http = require('http');
//var https = require('https');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
});

