using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;

namespace CoreNodeServices.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        INodeServices _nodeServices;

        public ValuesController(INodeServices nodeServices)
        {
            _nodeServices = nodeServices;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetAsync(string name)
        {
            var list = new List<Object> { "1", "2", "3" };

            var base64String = await _nodeServices.InvokeAsync<string>("module.js", name, list);
            var bytes = Convert.FromBase64String(base64String);

            return File(bytes, "application/pdf", "ThroughNPM.pdf");
        }
    }
}
