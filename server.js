// Grab required modules
var http = require("http"),
  express = require("express"),
  path = require("path"),
  relay = require("./relay"),
  cue = require("./cue");

// Server Objects
var router = express();
var server = http.createServer(router);

// Setup routes

// Calls to trigger relays
router.all("/relay/:relay", function(req, res)
{
  console.log("Relay " + req.params.relay + " requested...");
  
  var postData = "";
  req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
  });
    
  req.addListener("end", function()
  {
    relay.activate(req.params.relay, 3000);
    
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

// Static client files
router.use(express.static(path.resolve(__dirname, "client")));

// Start listening
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function()
{
  var addr = server.address();
  console.log("Prism server is listening at " + addr.address + ":" + addr.port);
});