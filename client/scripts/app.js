'use strict';

/* App Module */

var prismApp = angular.module('prismApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngAudio', 'prismControllers', 'prismServices']);

prismApp.config(function($mdThemingProvider)
{
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('blue')
    .warnPalette('red');
});

prismApp.config(['$routeProvider',
  function($routeProvider)
  {
    $routeProvider
      .when('/wedding',
      {
        templateUrl: 'views/wedding.html',
        controller: 'WeddingCtrl'
      })
      .when('/cues',
      {
        templateUrl: 'views/cues.html',
        controller: 'CuesCtrl'
      })
      .when('/cues/script/:scriptId',
      {
        templateUrl: 'views/script.html',
        controller: 'ScriptCtrl'
      })
      .otherwise(
      {
        redirectTo: '/wedding'
      });
  }
]);