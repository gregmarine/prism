// Grab required modules
var http = require("http"),
  express = require("express"),
  path = require("path"),
  relay = require("./relay"),
  cue = require("./cue"),
  scripts = require("./script");

// Server Objects
var router = express();
var server = http.createServer(router);

// Setup routes

// Calls to trigger relays
router.all("/relay/:relay/:direction", function(req, res)
{
  console.log("Relay " + req.params.relay + " requested...");
  
  var postData = "";
  req.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
  });
    
  req.addListener("end", function()
  {
    switch(req.params.direction)
    {
      case "activate":
        relay.activate(req.params.relay, 0);
        break;
      case "deactivate":
        relay.deactivate(req.params.relay);
        break;
    }
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("ok");
  });
});

// Calls to trigger cues
router.all("/cue/:cue", function(req, res)
{
  console.log("Cue " + req.params.cue + " requested...");
  
  var postData = "";
  req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
  });
    
  req.addListener("end", function()
  {
    cue.trigger(req.params.cue);
    
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("ok");
  });
});

// List PRISM scripts
router.all("/script", function(req, res)
{
  console.log("Script list requested...");
  
  var postData = "";
  req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
  });

  req.addListener("end", function()
  {
    scripts.listScripts(function(err, scripts)
    {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(scripts));
      res.end("");
    });
  });
});

// Load a PRISM script identified by the specified id
router.all("/script/:id", function(req, res)
{
  console.log("Script " + req.params.id + " requested...");
  
  var postData = "";
  req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
  });

  req.addListener("end", function()
  {
    scripts.loadScript(req.params.id, function(err, script)
    {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(script));
      res.end("");
    });
  });
});

// Static client files
router.use(express.static(path.resolve(__dirname, "client")));

// Start listening
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function()
{
  var addr = server.address();
  console.log("Prism server is listening at " + addr.address + ":" + addr.port);
});