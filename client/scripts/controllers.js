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
});

prismControllers.controller('CuesCtrl', function($scope, $timeout, $http)
{
  $scope.triggerCue = function(trigger, cue)
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
  };
});