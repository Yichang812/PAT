'use strict';

var cluster = require('cluster');

if (cluster.isMaster) {
	// var numCPUs = require('os').cpus().length;
	var numCPUs = 4;

	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	// cluster.on('exit', function() {
	// 	console.log('A worker process died, restarting...');
	// 	cluster.fork();
	// });
} else {

// ******* a single node in cluster ********

var express = require('express');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');

// connect to mongodb 500MB database service provided by mlab.com for free
mongoose.connect('mongodb://webpat:pat2016@ds011870.mlab.com:11870/webpat_user');

// create express application
var app = express();

// logger
app.use(morgan('dev'));

// serve staic files from 'public' folder
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// middleware to parse cookie
app.use(cookieParser());

// middleware to parse URLencoded / json requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Account = require('./auth/account_model');

// create local strategy for user authentication
var myLocalStrategy = new localStrategy(
	(email, password, cb) => {
		Account.findOne({
			email: email
		}, (err, account) => {
			if(err) {
				return cb(err);
			}
			if(!account){
				return cb(null, false);
			}
			account.verify(password, cb);
		});
});

passport.use(myLocalStrategy);

// serialize and deserialize users for session persistence
passport.serializeUser((account, cb) => {
	cb(null, account.email);
});
passport.deserializeUser((email, cb) => {
	Account.findOne({
		email: email
	}, (err, account) => {
		if(err) {
			return cb(err);
		}
		cb(null, account);
	})
});

app.use(session({
	secret: 'pat web',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// POST login endpoint
app.post('/login',
	passport.authenticate('local'),
	(req, res) => {
		res.status(201).json({status: 201});
	}
);

// GET logout endpoint
app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		// redirect to '/' after logged out
		res.redirect('/');
	});
});

app.get('/islogin', function(req,res){
	console.log(req.user);
	if(req.user){
		res.json({islogin:true});
	}else{
		res.json({islogin:false});
	}
});

// api router
app.use('/api', require('./api/index'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('PAT listening at http://%s:%s', host, port);
});

// ************************************************

}

