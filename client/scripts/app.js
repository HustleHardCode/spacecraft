'use strict';

/**
 * @ngdoc overview
 * @name  Spacecraft
 * @description
 * # spacecraft
 *
 * Main module of the application.
 */
angular.module('spacecraft', [
    'ui.router',
    'ui.ace',
    'spacecraft.main'
])
    .config(['$urlRouterProvider', function ($urlRouterProvider)
    {
        // For any unmatched url, send to ""
        $urlRouterProvider.otherwise("/");
    }]);
