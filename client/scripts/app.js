'use strict';

/* App Module */

var prismApp = angular.module('prismApp', ['ngRoute', 'ngMaterial', 'prismControllers']);

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
      .when('/cues',
      {
        templateUrl: 'views/cues.html',
        controller: 'CuesCtrl'
      })
      .otherwise(
      {
        redirectTo: '/cues'
      });
  }
]);