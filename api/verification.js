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
  assertions = verification_get_assertions_endpoint({spec: JSON.parse(req.body.specStr)}, true);
  res.json({assertions: assertions});
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
  result = verification_verify_assertion_endpoint({
  	spec: JSON.parse(req.body.specStr),
  	assertion: req.body.assertion
  }, true);
  console.log(result);
  res.json({result: result});
});


module.exports = router;
