var fs = require('fs');
var path = require('path');

// Filters on the PRISM file extension
function isPRISM(value)
{
  return (path.extname(value) === ".prism");
}

var Script = function()
{
  // Retrieves a list of PRISM scripts in the ./scripts directory.
  this.listScripts = function(cb)
  {
    fs.readdir(path.resolve(__dirname, "scripts"), function (err, files)
    {
      files = files.filter(isPRISM);
      
      var scripts = new Array();
      
      for(var i in files)
      {
        scripts.push({});
        
        var script = JSON.parse(fs.readFileSync(path.resolve(__dirname, "scripts/" + files[i])));
        
        scripts[i].id = path.basename(files[i], '.prism');
        scripts[i].name = script.name;
        scripts[i].description = script.description;
      }
      
      cb(err, scripts);
    });
  };
  
  // Retrieves the script by the specified id from the ./scripts directory.
  this.loadScript = function(id, cb)
  {
    fs.readFile(path.resolve(__dirname, "scripts/" + id + ".prism"), function(err, data)
    {
      cb(err, JSON.parse(data));
    });
  };
};

module.exports = new Script();