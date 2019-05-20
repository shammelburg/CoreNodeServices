Install nuget package Microsoft.AspNetCore.NodeServices

Add the following lines to ConfigureServices in Startup.cs

services.AddNodeServices();
services.AddScoped<IModuler, Moduler>();

Add the package.json to the root on the main project, this should start pulling down the npm package(s).

In your controller,

[HttpGet]
public async Task<IActionResult> GetAsync(string name)
{
    return File(await _mod.CreatePDF(name, "example2"), "application/pdf", "ThroughNPM.pdf");
}