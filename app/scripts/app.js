'use strict';

/**
 * @name restaurantsApp
 */
angular
  .module('restaurantsApp', [
    'ngResource',
    'ngRoute',
    'ngCookies',
    'ngTouch',
    'slick',
    'angular-flexslider',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/gradovi', {
        title: 'Meniji restorana u Srbiji, naručite hranu za dostavu u Nišu ili Novom Sadu',
        templateUrl: 'views/main.html'
      })
      .when('/:location/:slug', {
        templateUrl: 'views/restaurant.html',
        controller: 'RestaurantCtrl'
      })
      .when('/:location', {
        templateUrl: 'views/location.html',
        controller: 'LocationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $modalStack) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $modalStack.dismissAll();

      if (typeof current.$$route.title !== 'undefined') {
        $rootScope.title = current.$$route.title;
      }
    });
  })
;
