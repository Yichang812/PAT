var mongoose = require('mongoose');

mongoose.connect('mongodb://webpat:pat2016@ds011870.mlab.com:11870/webpat_user');

var Account = require('./auth/account_model');

Account.create({ email: 'admin@email.com', password: 'admin' }, (err, admin) => {
	if(err) return console.log('Error.');
	console.log('Success.');
});

