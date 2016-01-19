var edge = require('edge');
var router = require('express').Router();

// CSP
var grammar_csp_endpoint = edge.func({
  source: './grammar_endpoints/csp.cs',
  references: ['./dll/PAT.Common.dll',
               './dll/PAT.Module.CSP.dll',
               './dll/Antlr3.Runtime.dll']
});
router.post('/csp', function(req, res) {
  result = grammar_csp_endpoint({'spec': req.body.spec}, true);
  res.json({result: result});
});


module.exports = router;
