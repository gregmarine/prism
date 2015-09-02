var gpio = {};

// If on Cloud 9, create dummy gpio object. Otherwise, load the Pi-GPIO library.
if(process.env.C9_PROJECT)
{
  gpio = {
    open: function(pin, mode, cb)
    {
      cb();
    },
    close: function(pin)
    {
      
    },
    write: function(pin, val, cb)
    {
      cb();
    }
  };
}
else
{
  gpio = require("pi-gpio");
}

var Relay = function()
{
  // GPIO pin to relay mapping array.
  var gpio_relay = [7,11,12,13,15,16,18,22];

  this.activate = function(relay_num, duration)
  {
    var gpio_relay_pin = gpio_relay[relay_num - 1];
    gpio.open(gpio_relay_pin, "output", function(error)
    {
      gpio.write(gpio_relay_pin, 0, function()
      {
        console.log("Relay " + relay_num + " activated.");
        
        if(duration > 0)
        {
          setTimeout(function()
          {
            module.exports.deactivate(relay_num);
          }, duration);
        }
      });
    });
  };
       
  this.deactivate = function(relay_num)
  {
    var gpio_relay_pin = gpio_relay[relay_num - 1];
    gpio.write(gpio_relay_pin, 1, function()
    {
      console.log("Relay " + relay_num + " deactivated.");
      
      gpio.close(gpio_relay_pin);
    });
  };
};

module.exports = new Relay();