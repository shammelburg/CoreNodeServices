using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CoreNodeServices.Modules
{
    public interface IModuler
    {
        Task<byte[]> CreatePDF(string name, string templateName);
    }
}
