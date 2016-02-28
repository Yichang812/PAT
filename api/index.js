var router = require('express').Router();

var grammar = require('./grammar');

// checking grammar
router.use('/grammar', require('./grammar'));
router.use('/verification', require('./verification'));

module.exports = router;
