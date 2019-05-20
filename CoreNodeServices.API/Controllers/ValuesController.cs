using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreNodeServices.Modules;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;

namespace CoreNodeServices.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        IModuler _moduler;

        public ValuesController(IModuler moduler)
        {
            _moduler = moduler;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetAsync(string name)
        {
            return File(await _moduler.CreatePDF(name, "table"), "application/pdf", "ThroughNPM.pdf");
        }
    }
}
