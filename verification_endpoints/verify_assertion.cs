using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using System.ComponentModel;

using PAT.CSP.LTS;
using PAT.Common;
using PAT.Common.Classes.Expressions.ExpressionClass;
using PAT.Common.Classes.ModuleInterface;

public class Startup
{
  public async Task<object> Invoke(dynamic input)
  {
    try
    {
      string specStr = (string)input.spec;
      string assertionStr = (string)input.assertion;
      int behavior = (int)input.behavior;
      int engine = (int)input.engine;

      SpecificationBase spec = new Specification(specStr);
      AssertionBase assertion = spec.AssertionDatabase[assertionStr];

      assertion.UIInitialize(null, behavior, engine);
      assertion.VerificationOutput.GenerateCounterExample = true;
      // assertion.VerificationMode = false;
      assertion.InternalStart();

      return new { 
      	statistics = assertion.GetResultString() + '\n' +
      		assertion.GetVerificationStatistics(), 
      	type = (int)assertion.VerificationOutput.VerificationResult
      };
    }
    catch (Exception e)
    {
      return e.StackTrace;
      //return e.TargetSite.GetType().Name;
    }
  }
}
