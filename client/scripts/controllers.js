'use strict';

/* Controllers */

var prismControllers = angular.module('prismControllers', []);

prismControllers.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $mdUtil, $log, $mdDialog, $http)
{
  $scope.armedState = "Unarmed";
  
  $scope.arm = function(armed)
  {
    if(armed)
    {
      $scope.armedState = "Armed";
      
      $http.get('/relay/1/activate')
        .then(function(res)
        {
          // Successful
        }, function(res)
        {
          // Unsuccessful
        });
    }
    else
    {
      $scope.armedState = "Unarmed";
      
      $http.get('/relay/1/deactivate')
        .then(function(res)
        {
          // Successful
        }, function(res)
        {
          // Unsuccessful
        });
    }
    return;
  };
  
  $scope.deadMan = function(e, arm)
  {
    if(e.keyCode == 27)
    {
      if(arm)
      {
        if($scope.armedState === "Unarmed")
        {
          $scope.armed = true;
          $scope.arm(arm);
        }
      }
      else
      {
        if($scope.armedState === "Armed")
        {
          $scope.armed = false;
          $scope.arm(arm);
        }
      }
    }
    return;
  };
});

prismControllers.controller('WeddingCtrl',
  ['$scope', '$timeout', '$http', '$location', '$parse', 'ngAudio', 'cueService',
function($scope, $timeout, $http, $location, $parse, ngAudio, cueService)
{
  $scope.nextCue = "Cue 1";
  $scope.timeToNext = 0;
  $scope.nextCuetime = 0;
  
  $scope.audio = ngAudio.load('music/HaveYouEverBeenInLove.mp3');
  
  $scope.$watch(function(scope) { return parseInt(scope.audio.currentTime) }, function(newVal, oldVal){
    console.log('Current Time: ' + newVal);
    
    var cues = [1,9,22,66,78,109,141,144,151,160,165,170];
    
    if(cues.indexOf(newVal) > -1)
    {
      var i = cues.indexOf(newVal);
      
      cueService.triggerCue(true, i + 1);
      
      var cue = $parse("cue" + (i + 1));
      cue.assign($scope, true);
      
      i++;
      
      if(i < cues.length)
      {
        $scope.nextCue = "Cue " + (i + 1);
        $scope.nextCuetime = cues[i];
      }
      else
      {
        $scope.nextCue = "Done";
        $scope.nextCuetime = 175;
      }
    }
    
    $scope.timeToNext = $scope.nextCuetime - newVal;
  }, true);
  
  $scope.triggerCue = function(trigger, cue)
  {
    cueService.triggerCue(trigger, cue);
    return;
  };
}]);

prismControllers.controller('CuesCtrl',
  ['$scope', '$timeout', '$http', '$location', 'cueService', 'scriptService',
function($scope, $timeout, $http, $location, cueService, scriptService)
{
  this.cues = (function() {
    var cuesObj = [];
    for (var i = 1; i < 13; i++) {
      cuesObj.push({
        title: "Cue " + i,
        name: "cue" + i,
        cue_num: i
      });
    }
    return cuesObj;
  })();
  
  scriptList();
  
  $scope.triggerCue = function(trigger, cue)
  {
    cueService.triggerCue(trigger, cue);
    return;
  };
  
  $scope.openScript = function(id)
  {
    console.log(id);
    $location.path("/cues/script/" + id);
  };
  
  function scriptList()
  {
    scriptService.getScriptList()
      .success(function(list)
      {
        console.log(list);
        
        $scope.scriptList = list;
      })
      .error(function(error)
      {
        // Failed
      });
  }
}]);

prismControllers.controller('ScriptCtrl', ['$scope', '$timeout', '$http', '$routeParams', 'scriptService',
function($scope, $timeout, $http, $routeParams, scriptService)
{
  loadScript($routeParams.scriptId);
  
  function loadScript(id)
  {
    scriptService.loadScript(id)
      .success(function(script)
      {
        $scope.name = script.name;
      })
      .error(function(error)
      {
        // Failed
      });
  }
}]);