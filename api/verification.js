var edge = require('edge');
var router = require('express').Router();

// Get assertions
var verification_get_assertions_endpoint = edge.func({
  source: './verification_endpoints/get_assertions.cs',
  references: ['./dll/PAT.Common.dll',
               './dll/PAT.Module.CSP.dll',
               './dll/Antlr3.Runtime.dll',
               './dll/PAT.Module.LTS.dll']
});
router.post('/assertions', function(req, res) {
  verification_get_assertions_endpoint({spec: JSON.parse(req.body.specStr)}, function(err, result) {
    if (err) throw err;
    res.json({assertions: result});
  });
});

// Verify assertion
var verification_verify_assertion_endpoint = edge.func({
  source: './verification_endpoints/verify_assertion.cs',
  references: ['./dll/PAT.Common.dll',
               './dll/PAT.Module.CSP.dll',
               './dll/Antlr3.Runtime.dll',
               './dll/PAT.Module.LTS.dll']
});
router.post('/verify_assertion', function(req, res) {
  verification_verify_assertion_endpoint({
  	spec: JSON.parse(req.body.specStr),
  	assertion: req.body.assertion,
    behavior: parseInt(req.body.behavior),
    engine: parseInt(req.body.engine)
  }, function(err, result) {
    if (err) throw err;
    res.json({result: result});
  });
});


module.exports = router;
