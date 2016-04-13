using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Threading.Tasks;

using Antlr.Runtime;
using Antlr.Runtime.Tree;

using PAT.Common;
using PAT.Common.Ultility;
using PAT.Common.Classes.Assertion;
using PAT.Common.Classes.DataStructure;
using PAT.Common.Classes.Expressions;
using PAT.Common.Classes.Expressions.ExpressionClass;
using PAT.Common.Classes.LTS;
using PAT.Common.Classes.ModuleInterface;
using PAT.Common.Classes.Ultility;


using PAT.CSP.LTS;

public class Startup
{
  public async Task<object> Invoke(dynamic input)
  {
    try
    {
      string specStr = (string)input.spec;
      SpecificationBase spec = new Specification(specStr);
      
      object[] assertionArray = new object[spec.AssertionDatabase.Count];
      int index = 0;
      foreach (KeyValuePair<String, AssertionBase> entry in spec.AssertionDatabase) {        
        assertionArray[index++] =  new { 
          assertion = entry.Key,
          behavior = entry.Value.ModelCheckingOptions.AddimissibleBehaviorsNames.ToArray(),
          engine = entry.Value.ModelCheckingOptions.AddimissibleBehaviors[0].VerificationEngines.ToArray()
        };
      }
      return assertionArray;
    }
    catch (Exception e)
    {
      return e.StackTrace;
      //return e.TargetSite.GetType().Name;
    }
  }
}
