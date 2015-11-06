'use strict';

/* Services */

var prismServices = angular.module('prismServices', []);

prismServices.service('cueService', ['$http', function($http)
{
  var currentCue = 0;
    
  return {
    getNextCue: function()
    {
      currentCue++;
      return currentCue;
    },
    
    triggerCue: function(trigger, cue)
    {
      if(trigger)
      {
        $http.get('/cue/' + cue)
          .then(function(res)
          {
            // Successful
          }, function(res)
          {
            // Failed
          });
      }
      return;
    }
  };
}]);

prismServices.service('scriptService', ['$http', function($http)
{
  return {
    getScriptList: function()
    {
      return $http.get('/script');
    },
    loadScript: function(id)
    {
      return $http.get('/script/' + id);
    }
  };
}]);