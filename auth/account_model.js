var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

AccountSchema.method('verify', (password, cb) => {
	if(this.password === password) {
		cb(null, this);
	} else {
		return cb(null, false);
	}
});

module.exports = mongoose.model('Account', AccountSchema);