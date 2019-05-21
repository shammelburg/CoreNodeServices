using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreNodeServices.API.Controllers
{
    [Route("api/values")]
    [ApiController]
    public class ValuesController : Controller
    {
        INodeServices _nodeServices;

        public ValuesController(INodeServices nodeServices)
        {
            _nodeServices = nodeServices;
        }

        // GET api/values
        [HttpGet]
        [Route("pdf")]
        public async Task<IActionResult> GetPDFAsync(string name)
        {
            var list = new List<object>();

            list.Add(new { name = "User 1", age = 33, job = "Angular Developer" });
            list.Add(new { name = "User 2", age = 26, job = "Marketing Manager" });
            list.Add(new { name = "User 3", age = 4, job = "Big Girl" });
            list.Add(new { name = "User 4", age = 1, job = "Baby Girl" });

            var base64String = await _nodeServices.InvokeAsync<string>("NodeServices/pdfmake/pdfmake.js", name, "example");
            var bytes = Convert.FromBase64String(base64String);

            return File(bytes, "application/pdf", "ThroughNPM.pdf");
        }

        // GET api/values
        [HttpGet]
        [Route("email")]
        public async Task<IActionResult> GetEmailAsync(string name, string email)
        {
            var user = new { name = name, email = email };

            var hasSentEmail = await _nodeServices.InvokeAsync<object>("NodeServices/nodemailer/nodemailer.js", user);

            return Ok(hasSentEmail);
        }
    }
}
