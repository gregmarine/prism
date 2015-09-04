var relay = require("./relay");

var Cue = function()
{
  // Relay to cue mapping array
  var relay_cue = [
    [2,5],[2,6],[2,7],[2,8], // 1-4
    [3,5],[3,6],[3,7],[3,8], // 5-8
    [4,5],[4,6],[4,7],[4,8], // 9-12
  ];
  
  this.trigger = function(cue_num)
  {
    var relay_indexes = relay_cue[cue_num - 1];
    
    relay.activate(relay_indexes[0], 3000);
    relay.activate(relay_indexes[1], 3000);
    
    console.log("Cue " + cue_num + " triggered.");
  };
};

module.exports = new Cue();