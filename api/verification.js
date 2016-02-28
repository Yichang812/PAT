var edge = require('edge');
var router = require('express').Router();

// CSP
var verification_csp_get_assertions_endpoint = edge.func({
  source: './verification_endpoints/csp_get_assertions.cs',
  references: ['./dll/PAT.Common.dll',
               './dll/PAT.Module.CSP.dll',
               './dll/Antlr3.Runtime.dll',
               './dll/PAT.Module.LTS.dll']
});
router.get('/csp_assertions', function(req, res) {
  assertions = verification_csp_get_assertions_endpoint({spec: JSON.parse(req.body.specStr)}, true);
  res.json({assertions: assertions});
});


module.exports = router;
