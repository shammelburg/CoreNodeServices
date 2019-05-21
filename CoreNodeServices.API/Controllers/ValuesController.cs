using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
            var list = new List<object>();

            list.Add(new { name = "User 1", age = 33, job = "Angular Developer" });
            list.Add(new { name = "User 2", age = 26, job = "Marketing Manager" });
            list.Add(new { name = "User 3", age = 4, job = "Big Girl" });
            list.Add(new { name = "User 4", age = 1, job = "Baby Girl" });

            var base64String = await _nodeServices.InvokeAsync<string>("NodeServices/pdfmake/module.js", name, "example");
            var bytes = Convert.FromBase64String(base64String);

            return File(bytes, "application/pdf", "ThroughNPM.pdf");
        }
    }
}
