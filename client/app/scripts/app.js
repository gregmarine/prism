'use strict';

/**
 * @ngdoc overview
 * @name prismApp
 * @description
 * # prismApp
 *
 * Main module of the application.
 */
angular
  .module('prismApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/cues', {
        templateUrl: 'views/cues.html',
        controller: 'CuesCtrl',
        controllerAs: 'cues'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
