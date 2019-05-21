Install nuget package Microsoft.AspNetCore.NodeServices

Add the following lines to ConfigureServices in Startup.cs

services.AddNodeServices();

Add the package.json to the root on the main project.

In your controller,

[HttpGet]
public async Task<IActionResult> GetAsync(string name)
{
    var base64String = await _nodeServices.InvokeAsync<string>("NodeServices/pdfmake/module.js", name, "example");
    var bytes = Convert.FromBase64String(base64String);

    return File(bytes, "application/pdf", "ThroughNPM.pdf");
}