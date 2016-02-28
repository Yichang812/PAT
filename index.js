var express = require('express');
var morgan = require('morgan')
var bodyParser = require('body-parser');

// create express application
var app = express();

// logger
app.use(morgan('dev'));

// serve staic files from 'public' folder
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// middleware to parse URLencoded / json requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// api router
app.use('/api', require('./api/index'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('PAT listening at http://%s:%s', host, port);
});
