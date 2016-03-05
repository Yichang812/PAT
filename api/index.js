var router = require('express').Router();

var grammar = require('./grammar');

// all api calls must be authenticated
router.use((req, res, next) => {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.sendStatus(401);
	}
});

// checking grammar
router.use('/grammar', require('./grammar'));
router.use('/verification', require('./verification'));

module.exports = router;
