var edge = require('edge');
var router = require('express').Router();

// CSP
var grammar_csp_endpoint = edge.func({
  source: './grammar_endpoints/csp.cs',
  references: ['./dll/PAT.Common.dll',
               './dll/PAT.Module.CSP.dll',
               './dll/Antlr3.Runtime.dll',
               './dll/PAT.Module.LTS.dll']
});
router.post('/csp', function(req, res) {
  result = grammar_csp_endpoint({spec: JSON.parse(req.body.specStr)}, function(err, result) {
  	if (err) throw err;
  	res.json({result: result});
  });
});


module.exports = router;
