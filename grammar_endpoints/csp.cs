using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

using PAT.CSP.LTS;

public class Startup
{
  public async Task<object> Invoke(dynamic input)
  {
    try
    {
      string specStr = (string)input.spec;
      Specification spec = new Specification(specStr);
      return spec.GetSpecification();
    }
    catch (Exception e)
    {
      return e.StackTrace;
      // return e.TargetSite.GetType().Name;
    }
  }
}
