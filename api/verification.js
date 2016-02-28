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
router.post('/verify_assertion', function(req, res) {
  res.json({result: "Not Implemented."})
});


module.exports = router;
