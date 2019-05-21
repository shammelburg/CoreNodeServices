Install nuget package Microsoft.AspNetCore.NodeServices

Add the following lines to ConfigureServices in Startup.cs

services.AddNodeServices();

Add the package.json to the root on the main project.

In your controller,

[HttpGet]
public async Task<IActionResult> GetAsync(string name)
{
    var list = new List<object>();

    list.Add(new { name = "User 1", age = 33, job = "Angular Developer" });
    list.Add(new { name = "User 2", age = 26, job = "Marketing Manager" });
    list.Add(new { name = "User 3", age = 4, job = "Big Girl" });
    list.Add(new { name = "User 4", age = 1, job = "Baby Girl" });

    var base64String = await _nodeServices.InvokeAsync<string>("Node/pdfmake/module.js", name, "example");
    var bytes = Convert.FromBase64String(base64String);

    return File(bytes, "application/pdf", "ThroughNPM.pdf");
}