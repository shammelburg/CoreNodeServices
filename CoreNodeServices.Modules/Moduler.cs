using Microsoft.AspNetCore.NodeServices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreNodeServices.Modules
{
    public class Moduler : IModuler
    {
        INodeServices _nodeServices;

        public Moduler(INodeServices nodeServices)
        {
            _nodeServices = nodeServices;
        }

        public async Task<byte[]> CreatePDF(string name, string templateName)
        {
            var list = new List<object>();

            list.Add(new { name = "User 1", age = 33, job = "Angular Developer" });
            list.Add(new { name = "User 2", age = 26, job = "Marketing Manager" });
            list.Add(new { name = "User 3", age = 4, job = "Big Girl" });
            list.Add(new { name = "User 4", age = 1, job = "Baby Girl" });

            var base64String = await _nodeServices.InvokeAsync<string>("../CoreNodeServices.Modules/pdf-module.js", name, list, templateName);
            var bytes = Convert.FromBase64String(base64String);

            return bytes;
        }
    }
}
